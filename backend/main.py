
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
    """
    Parse markdown content to extract structured data for the newsletter.
    Returns a dictionary with date, news categories and items, QA table data.
    """
    try:
        logging.debug("Starting markdown parsing")
        
        # Initialize the data structure
        parsed_data = {
            'date': None,
            'news': [],
            'qa_table': {
                'questions': [],
                'answers': []
            }
        }
        
        # Split content by lines
        lines = md_content.split('\n')
        
        # Extract date from the first line if it matches a date pattern
        if lines and lines[0].strip().startswith('Date:'):
            parsed_data['date'] = lines[0].replace('Date:', '').strip()
            lines = lines[1:]  # Remove the date line from further processing
        
        # Process the rest of the content
        current_category = None
        current_news_items = []
        
        # Simple state machine to track what we're parsing
        in_qa_table = False
        qa_rows = []
        
        for line in lines:
            # Check for category headers (all caps followed by "NEWS")
            if line.strip().upper().endswith(' NEWS') and line.strip().isupper():
                # If we were collecting news items for a previous category, add them
                if current_category and current_news_items:
                    parsed_data['news'].append({
                        'title': current_category,
                        'items': current_news_items
                    })
                
                # Start a new category
                current_category = line.strip()
                current_news_items = []
                in_qa_table = False
                
            # Check for QA table section
            elif line.strip().startswith('|') and line.strip().endswith('|'):
                in_qa_table = True
                qa_rows.append(line.strip())
                
            # Process news items when not in QA table
            elif not in_qa_table and line.strip() and current_category:
                # Assume this is a news headline if it doesn't start with a special character
                if not line.strip().startswith(('-', '*', '>', '#')):
                    current_news_items.append({
                        'headline': line.strip(),
                        'content': [],
                        'image_index': None  # Will be populated if images are referenced
                    })
                # If it's a content line for the current news item
                elif current_news_items and line.strip().startswith(('-', '*')):
                    content_text = line.strip().lstrip('-* ')
                    if content_text:
                        current_news_items[-1]['content'].append(content_text)
        
        # Add the last category if there is one
        if current_category and current_news_items:
            parsed_data['news'].append({
                'title': current_category,
                'items': current_news_items
            })
        
        # Process QA table rows if any were collected
        if qa_rows:
            # Skip the header and separator rows
            data_rows = [row for row in qa_rows if '---' not in row][1:]
            
            for row in data_rows:
                cells = [cell.strip() for cell in row.split('|') if cell.strip()]
                if len(cells) >= 2:
                    parsed_data['qa_table']['questions'].append(cells[0])
                    parsed_data['qa_table']['answers'].append(cells[1])
        
        logging.debug(f"Parsed data: {parsed_data}")
        return parsed_data
        
    except Exception as e:
        logging.error(f"Error parsing markdown: {str(e)}")
        logging.error(traceback.format_exc())
        raise ValueError(f"Failed to parse markdown: {str(e)}")

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
        
        # Get image filenames (initialize as empty list)
        image_files = []
        
        # Extract ZIP file
        try:
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(images_dir)
                
            # After successful extraction, get the image files
            if os.path.exists(images_dir):
                image_files = sorted([f for f in os.listdir(images_dir) 
                                if os.path.isfile(os.path.join(images_dir, f))])
        except zipfile.BadZipFile:
            logging.error(f"Bad ZIP file: {zip_path}")
            raise HTTPException(status_code=400, detail="The uploaded file is not a valid ZIP archive")
        except Exception as zip_error:
            logging.error(f"Error extracting ZIP file: {str(zip_error)}")
            raise HTTPException(status_code=400, detail=f"Unable to extract ZIP file: {str(zip_error)}")
        
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
            logging.error(traceback.format_exc())
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
                image_index = item.get('image_index')
                if image_index is not None and len(image_files) > 0 and image_index < len(image_files):
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

