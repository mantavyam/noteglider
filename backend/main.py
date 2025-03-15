from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
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
    """Parse Markdown content into structured data."""
    html = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])
    soup = BeautifulSoup(html, 'html.parser')
    data = {
        'date': None,
        'qa_table': {'questions': [], 'answers': []},
        'news': []
    }
    current_category = None
    news_index = 0

    for tag in soup.children:
        if tag.name == 'h1':
            if not data['date']:
                data['date'] = tag.text.strip()  # First # is the date
            elif tag.text.strip() == 'CURRENT AFFAIRS':
                table = tag.find_next('table')
                if table:
                    for row in table.find_all('tr')[1:]:  # Skip header
                        cols = row.find_all('td')
                        if len(cols) == 2:
                            data['qa_table']['questions'].append(cols[0].text.strip())
                            data['qa_table']['answers'].append(cols[1].text.strip())
            elif tag.text.strip() != 'OUTLINE':  # Skip Outline
                current_category = {'title': tag.text.strip(), 'items': []}
                data['news'].append(current_category)
        elif current_category and tag.name == 'h2':  # Skip repeated date
            continue
        elif current_category and tag.name == 'h3':
            current_category['items'].append({
                'headline': tag.text.strip(),
                'content': [],
                'tables': [],
                'image_index': news_index
            })
            news_index += 1
        elif current_category and tag.name == 'p':
            current_category['items'][-1]['content'].append(tag.text.strip())
        elif current_category and tag.name == 'table':
            rows = [[td.text.strip() for td in tr.find_all('td')] for tr in tag.find_all('tr')]
            current_category['items'][-1]['tables'].append(rows)

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
        
        # Read and parse markdown content
        with open(md_path, "r", encoding="utf-8") as f:
            md_content = f.read()
        parsed_data = parse_markdown(md_content)
        
        # Render templates
        main_template = env.get_template("pdf_layout.html")
        full_html = main_template.render(
            date=parsed_data['date'].replace('-', '/'),  # Format DD-MM-YY to DD/MM/YY
            questions=parsed_data['qa_table']['questions'],
            answers=parsed_data['qa_table']['answers'],
            news=parsed_data['news'],
            images=[os.path.join("images", img) for img in image_files],  # Relative paths
            custom_url=custom_url or "https://www.youtube.com/@Studyniti/streams"
        )
        
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
        print(f"Error: {str(e)}")
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
        headers={"Content-Disposition": "inline; filename=newsletter.pdf"}  # Changed to inline
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