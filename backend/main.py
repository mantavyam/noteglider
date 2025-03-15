import logging
logging.basicConfig(level=logging.DEBUG)
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import shutil
import zipfile
import markdown
import uuid
from weasyprint import HTML
from typing import Optional
from jinja2 import Environment, FileSystemLoader
from bs4 import BeautifulSoup

app = FastAPI(title="Newsletter Generator API")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create temp and output directories
TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)
OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Set up Jinja2 environment
env = Environment(loader=FileSystemLoader("templates"))

def parse_markdown(md_content: str):
    logging.debug(f"Raw Markdown: {md_content}")
    html = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])
    soup = BeautifulSoup(html, 'html.parser')
    data = {
        'date': None,
        'qa_table': {'questions': [], 'answers': []},
        'news': []
    }
    current_category = None
    current_item = None
    news_index = 0
    in_news_item = False  # Track if we're inside a news item

    for tag in soup.children:
        if tag.name == 'h1':
            if not data['date']:
                data['date'] = tag.text.strip()
            elif tag.text.strip() == 'CURRENT AFFAIRS':
                table = tag.find_next('table')
                if table:
                    for row in table.find_all('tr')[1:]:
                        cols = row.find_all('td')
                        if len(cols) == 2:
                            data['qa_table']['questions'].append(cols[0].text.strip())
                            data['qa_table']['answers'].append(cols[1].text.strip())
            elif tag.text.strip() != 'OUTLINE':
                current_category = {'title': tag.text.strip(), 'items': []}
                data['news'].append(current_category)
                current_item = None
        elif tag.name == 'h2':  # Skip repeated dates
            continue
        elif current_category and tag.name == 'h3':
            current_item = {
                'headline': tag.text.strip(),
                'content': [],
                'tables': [],
                'image_index': news_index
            }
            current_category['items'].append(current_item)
            news_index += 1
            in_news_item = True  # Start capturing content
        elif in_news_item:
            if tag.name == 'p':
                current_item['content'].append(tag.text.strip())
            elif tag.name in ['ul', 'ol']:
                list_items = [li.text.strip() for li in tag.find_all('li')]
                current_item['content'].extend(list_items)
            elif tag.name == 'table':
                rows = [[td.text.strip() for td in tr.find_all('td')] 
                       for tr in tag.find_all('tr')]
                current_item['tables'].append(rows)
            elif tag.name in ['h1', 'h2', 'h3']:
                in_news_item = False  # Stop at next heading

    logging.debug(f"Parsed Data: {data}")
    return data

@app.post("/api/generate-pdf")
async def generate_pdf(
    markdown_file: UploadFile = File(...),
    images_zip: UploadFile = File(...),
    custom_url: Optional[str] = Form(None)
):
    try:
        # Create a unique ID for this request
        request_id = str(uuid.uuid4())
        request_dir = os.path.join(TEMP_DIR, request_id)
        os.makedirs(request_dir, exist_ok=True)
        
        # Save the markdown file
        md_path = os.path.join(request_dir, markdown_file.filename)
        with open(md_path, "wb") as f:
            shutil.copyfileobj(markdown_file.file, f)
        
        # Save and extract the zip file
        images_dir = os.path.join(request_dir, "images")
        os.makedirs(images_dir, exist_ok=True)
        zip_path = os.path.join(request_dir, images_zip.filename)
        
        with open(zip_path, "wb") as f:
            shutil.copyfileobj(images_zip.file, f)
        
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(images_dir)
        
        # Get image filenames
        image_files = sorted(os.listdir(images_dir))  # Sort to match index order
        
        # Copy static assets (e.g., icons) to temp directory
        shutil.copytree(
            os.path.abspath('static'), 
            os.path.join(request_dir, 'static'), 
            dirs_exist_ok=True
        )
        
        # Read and parse markdown content
        with open(md_path, "r", encoding="utf-8") as f:
            md_content = f.read()
        parsed_data = parse_markdown(md_content)
        
        # Render news content for columns
        column2_html = []
        column3_html = []

        for category in parsed_data['news']:
            # Render category separator (e.g., NATIONAL NEWS)
            category_separator = env.get_template("CategorySeparator.html").render(title=category['title'])
            column2_html.append(category_separator)
            
            for item in category['items']:
                # Render news heading
                heading_html = env.get_template("NewsHeading.html").render(heading=item['headline'])
                
                # Render news description (content and tables)
                description_html = env.get_template("NewsDescription.html").render(
                    content=item['content'],
                    tables=item['tables']
                )
                
                # Render image if available
                image_html = ""
                if item['image_index'] < len(image_files):
                    image_path = os.path.join("images", image_files[item['image_index']])
                    image_html = env.get_template("NewsImage.html").render(image_path=image_path)
                
                # Combine elements
                news_item_html = heading_html + description_html + image_html
                
                # Distribute items between columns (simple alternating logic)
                if len(column2_html) <= len(column3_html):
                    column2_html.append(news_item_html)
                else:
                    column3_html.append(news_item_html)

        # Join HTML content for each column
        news_content_column_2 = "\n".join(column2_html)
        news_content_column_3 = "\n".join(column3_html)
        
        # Render templates
        main_template = env.get_template("pdf_layout.html")
        full_html = main_template.render(
            date=parsed_data['date'].replace('-', '/'),  # Format DD-MM-YY to DD/MM/YY
            questions=parsed_data['qa_table']['questions'],
            answers=parsed_data['qa_table']['answers'],
            news_content_column_2=news_content_column_2,
            news_content_column_3=news_content_column_3,
            images=[os.path.join("images", img) for img in image_files],
            custom_url=custom_url or "https://www.youtube.com/@Studyniti/streams"
        )
        logging.debug(f"Rendered HTML: {full_html}")
        
        # Generate PDF
        pdf_filename = f"newsletter_{request_id}.pdf"
        pdf_path = os.path.join(OUTPUT_DIR, pdf_filename)
        HTML(string=full_html, base_url=request_dir).write_pdf(pdf_path)
        
        return {
            "success": True,
            "message": "PDF generated successfully",
            "pdf_url": f"/api/download/{pdf_filename}",
            "filename": "newsletter.pdf",
            "size": os.path.getsize(pdf_path) / 1024  # Size in KB
        }
    
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/download/{filename}")
async def download_pdf(filename: str):
    file_path = os.path.join(OUTPUT_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename="newsletter.pdf",
        headers={"Content-Disposition": "inline; filename=newsletter.pdf"}
    )

@app.get("/api/status")
async def get_status():
    return {"status": "online", "message": "Backend service is running"}

@app.on_event("startup")
async def startup_event():
    print("Newsletter API started")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)