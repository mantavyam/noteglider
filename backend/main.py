
import logging
import traceback
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
    # ... keep existing code (markdown parsing function)
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
        
        try:
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(images_dir)
        except Exception as zip_error:
            logging.error(f"Error extracting ZIP file: {str(zip_error)}")
            raise HTTPException(status_code=400, detail=f"Unable to extract ZIP file: {str(zip_error)}")
        
        # Get image filenames
        image_files = []
        if os.path.exists(images_dir):
            image_files = sorted([f for f in os.listdir(images_dir) 
                                if os.path.isfile(os.path.join(images_dir, f))])  # Sort to match index order
        
        logging.debug(f"Found image files: {image_files}")
        
        # Copy static assets (e.g., icons) to temp directory
        shutil.copytree(
            os.path.abspath('static'), 
            os.path.join(request_dir, 'static'), 
            dirs_exist_ok=True
        )
        
        # Read and parse markdown content
        try:
            with open(md_path, "r", encoding="utf-8") as f:
                md_content = f.read()
            parsed_data = parse_markdown(md_content)
        except Exception as md_error:
            logging.error(f"Error parsing markdown: {str(md_error)}")
            raise HTTPException(status_code=400, detail=f"Error parsing markdown: {str(md_error)}")
        
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
                
                # Convert content array to HTML for the description
                content_html = ""
                if item['content']:
                    paragraphs = []
                    for content_item in item['content']:
                        paragraphs.append(f"<p>{content_item}</p>")
                    content_html = "".join(paragraphs)
                
                # Render news description (content and tables)
                description_html = env.get_template("NewsDescription.html").render(
                    content=content_html
                )
                
                # Render image if available
                image_html = ""
                image_index = getattr(item, 'image_index', None)
                if image_index is not None and image_index < len(image_files):
                    image_path = os.path.join("images", image_files[image_index])
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
        
        # Prepare data for templates
        template_data = {
            'date': parsed_data['date'].replace('-', '/') if parsed_data['date'] else "DD/MM/YY",
            'brand_name': "Learning Niti",
            'doc_type': "DAILY NEWSLETTER",
            'youtube_link': custom_url or "https://www.youtube.com/@Studyniti/streams",
            'youtube_text': "[CLICK] to WATCH Today's<br>NEWS Analysis + Current Affairs",
            'tagline': "ONE STOP SOLUTION FOR ALL BANKING EXAMS",
            'brand_heading': "CROSSWORD",
            'author': "By: Kapil Kathpal",
            'title': "IMPORTANT NEWS COVERAGE FOR ALL BANK EXAMS",
            'link_text': "[CLICK] to WATCH Today's NEWS Analysis + Current Affairs",
            'link_url': custom_url or "https://www.youtube.com/@Studyniti/streams",
            'questions': parsed_data['qa_table']['questions'],
            'answers': parsed_data['qa_table']['answers'],
            'news_content_column_2': news_content_column_2,
            'news_content_column_3': news_content_column_3,
            'images': [os.path.join("images", img) for img in image_files],
            'custom_url': custom_url or "https://www.youtube.com/@Studyniti/streams"
        }
        
        try:
            # Render templates
            main_template = env.get_template("pdf_layout.html")
            full_html = main_template.render(**template_data)
            logging.debug(f"Rendered HTML length: {len(full_html)}")
            
            # Generate PDF
            pdf_filename = f"newsletter_{request_id}.pdf"
            pdf_path = os.path.join(OUTPUT_DIR, pdf_filename)
            
            # Pass the base path to WeasyPrint
            HTML(string=full_html, base_url=request_dir).write_pdf(pdf_path)
            
            return {
                "success": True,
                "message": "PDF generated successfully",
                "pdf_url": f"/api/download/{pdf_filename}",
                "filename": "newsletter.pdf",
                "size": os.path.getsize(pdf_path) / 1024  # Size in KB
            }
        except Exception as template_error:
            logging.error(f"Template rendering or PDF generation error: {str(template_error)}")
            logging.error(traceback.format_exc())
            raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(template_error)}")
    
    except Exception as e:
        logging.error(f"Error during PDF generation: {str(e)}")
        logging.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

# ... keep existing code (the rest of the API endpoints and functions)
