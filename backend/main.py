import logging
import traceback
logging.basicConfig(level=logging.DEBUG)
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import re
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)
OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

env = Environment(loader=FileSystemLoader("templates"))
env.globals['zip'] = zip

def parse_markdown(md_content: str):
    try:
        logging.debug("Starting markdown parsing")
        
        parsed_data = {
            'date': None,
            'current_affairs': {
                'questions': [],
                'answers': []
            },
            'all_content': []
        }
        
        lines = md_content.split('\n')
        current_section = None
        current_subsection = None
        current_item = None
        in_qa_table = False
        table_rows = []
        table_separator_found = False
        
        date_pattern = re.compile(r'^\s*\*?\*?(\d{1,2}(\+\d{1,2})?-\d{1,2}-\d{2,4})\*?\*?\s*$')
        
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            
            if not line:
                i += 1
                continue
            
            # Skip lines that are only dates, including headings
            if date_pattern.match(line.lstrip('#')):
                logging.debug(f"Skipping date line: {line}")
                i += 1
                continue
            
            if line.startswith('#'):
                heading_level = 0
                heading_text = line
                while heading_text.startswith('#'):
                    heading_level += 1
                    heading_text = heading_text[1:]
                heading_text = heading_text.strip()
                
                if heading_level == 1 and parsed_data['date'] is None:
                    parsed_data['date'] = heading_text
                    parsed_data['all_content'].append({
                        'type': 'heading',
                        'level': heading_level,
                        'content': heading_text
                    })
                elif heading_level == 1:
                    current_section = heading_text
                    current_subsection = None
                    current_item = None
                    
                    parsed_data['all_content'].append({
                        'type': 'heading',
                        'level': heading_level,
                        'content': heading_text
                    })
                    if heading_text == 'CURRENT AFFAIRS':
                        in_qa_table = True
                elif heading_level == 2:
                    current_subsection = heading_text
                    current_item = None
                    
                    parsed_data['all_content'].append({
                        'type': 'heading',
                        'level': heading_level,
                        'content': heading_text,
                        'parent': current_section
                    })
                elif heading_level == 3:
                    current_item = heading_text
                    
                    parsed_data['all_content'].append({
                        'type': 'heading',
                        'level': heading_level,
                        'content': heading_text,
                        'parent': current_section
                    })
            
            elif line.startswith('|'):
                if not table_rows:
                    table_separator_found = False
                
                if ':' in line and '-' in line and line.replace('-', '').replace('|', '').replace(':', '').strip() == "":
                    table_separator_found = True
                    i += 1
                    continue
                elif line.replace('-', '').replace('|', '').strip() == "":
                    table_separator_found = True
                    i += 1
                    continue
                
                cells = [cell.strip() for cell in line.split('|')[1:-1]]
                if cells:
                    cleaned_cells = [re.sub(r'\*\*(.*?)\*\*', r'\1', cell) for cell in cells]
                    table_rows.append(cleaned_cells)
                
                if i + 1 >= len(lines) or not lines[i + 1].strip().startswith('|'):
                    if table_rows:
                        has_headers = table_separator_found and len(table_rows) > 1
                        table_data = {
                            'headers': table_rows[0] if has_headers else None,
                            'rows': table_rows[1:] if has_headers else table_rows
                        }
                        
                        if in_qa_table and len(parsed_data['current_affairs']['questions']) == 0 and len(table_rows) > 1:
                            for row in (table_rows[1:] if has_headers else table_rows):
                                if len(row) >= 2:
                                    parsed_data['current_affairs']['questions'].append(row[0])
                                    parsed_data['current_affairs']['answers'].append(row[1])
                            in_qa_table = False
                        
                        parsed_data['all_content'].append({
                            'type': 'table',
                            'content': table_data,
                            'parent': current_item or current_section
                        })
                        table_rows = []
            
            elif line.startswith('*'):
                content = line.lstrip('*').strip()
                content = re.sub(r'\*\*(.*?)\*\*', r'\1', content)
                
                parsed_data['all_content'].append({
                    'type': 'bullet',
                    'content': content,
                    'parent': current_item or current_section
                })
            
            elif not line.startswith('#') and not line.startswith('|'):
                content = re.sub(r'\*\*(.*?)\*\*', r'\1', line)
                
                parsed_data['all_content'].append({
                    'type': 'text',
                    'content': content,
                    'parent': current_item or current_section
                })
            
            i += 1
        
        logging.debug(f"Parsed {len(parsed_data['all_content'])} content items")
        return parsed_data
        
    except Exception as e:
        logging.error(f"Error parsing markdown: {str(e)}")
        logging.error(traceback.format_exc())
        raise ValueError(f"Failed to parse markdown: {str(e)}")

def estimate_height(html):
    """Estimate the height of HTML content in mm based on simple_layout.html."""
    if html.startswith('<h1'):
        return 12  # 14pt + margins
    elif html.startswith('<h2'):
        return 10  # 12pt + margins
    elif html.startswith('<h3'):
        return 8   # 10pt + margins
    elif html.startswith('<table'):
        rows = html.count('<tr>')
        return 5 + rows * 3  # Base height + 3mm per row
    elif html.startswith('<ul'):
        items = html.count('<li>')
        return items * 4     # 4mm per list item
    elif html.startswith('<p'):
        match = re.search(r'<p>(.*?)</p>', html)
        content = match.group(1) if match else html
        words = len(content.split())
        lines = max(1, words // 5)  # ~10 words per line in 61.33mm width
        return lines * 4            # 4mm per line
    return 4  # Default fallback

def split_paragraph(html, remaining_space):
    """Split paragraphs or lists to fit within remaining_space (in mm)."""
    if not html.startswith('<p>') and not html.startswith('<ul>'):
        return None, html

    if html.startswith('<p>'):
        match = re.search(r'<p>(.*?)</p>', html)
        if not match:
            return None, html
        content = match.group(1)
        words = content.split()
        if len(words) <= 3:  # Don't split very short paragraphs
            return None, html

        lines_possible = remaining_space // 4  # 4mm per line
        words_per_line = 10
        words_to_fit = lines_possible * words_per_line

        if words_to_fit >= len(words):
            return html, None

        first_part = ' '.join(words[:words_to_fit])
        second_part = ' '.join(words[words_to_fit:])
        return f"<p>{first_part}</p>", f"<p>{second_part}</p>"

    elif html.startswith('<ul>'):
        list_items = re.findall(r'<li>(.*?)</li>', html)
        if not list_items:
            return None, html

        items_possible = remaining_space // 4  # 4mm per item
        if items_possible >= len(list_items):
            return html, None

        first_list = "<ul>" + "".join([f"<li>{item}</li>" for item in list_items[:items_possible]]) + "</ul>"
        second_list = "<ul>" + "".join([f"<li>{item}</li>" for item in list_items[items_possible:]]) + "</ul>"
        return first_list, second_list

    return None, html

@app.post("/api/generate-pdf")
async def generate_pdf(
    markdown_file: UploadFile = File(...),
    images_zip: UploadFile = File(...),
    custom_url: Optional[str] = Form(None)
):
    try:
        request_id = str(uuid.uuid4())
        request_dir = os.path.join(TEMP_DIR, request_id)
        os.makedirs(request_dir, exist_ok=True)
        
        # Save uploaded markdown file
        md_path = os.path.join(request_dir, markdown_file.filename)
        with open(md_path, "wb") as f:
            shutil.copyfileobj(markdown_file.file, f)
        
        # Extract images from zip
        images_dir = os.path.join(request_dir, "images")
        os.makedirs(images_dir, exist_ok=True)
        zip_path = os.path.join(request_dir, images_zip.filename)
        
        with open(zip_path, "wb") as f:
            shutil.copyfileobj(images_zip.file, f)
        
        image_files = []
        try:
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(images_dir)
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
        
        # Copy static assets
        shutil.copytree(
            os.path.abspath('static'), 
            os.path.join(request_dir, 'static'), 
            dirs_exist_ok=True
        )
        
        # Parse markdown content
        try:
            with open(md_path, "r", encoding="utf-8") as f:
                md_content = f.read()
            parsed_data = parse_markdown(md_content)
        except Exception as md_error:
            logging.error(f"Error parsing markdown: {str(md_error)}")
            logging.error(traceback.format_exc())
            raise HTTPException(status_code=400, detail=f"Error parsing markdown: {str(md_error)}")
        
        # Define helper function to generate HTML for content items
        def generate_html_for_content(item, image_files):
            content_html = ""
            
            # Skip date lines
            date_pattern = re.compile(r'^\s*\*?\*?(\d{1,2}(\+\d{1,2})?-\d{1,2}-\d{2,4})\*?\*?\s*$')
            content_to_check = item['content'] if item['type'] in ['text', 'heading'] else ""
            if date_pattern.match(content_to_check):
                return ""
            
            if item['type'] == 'heading':
                level = item['level']
                content = re.sub(r'\*\*(.*?)\*\*', r'\1', item['content'])
                if level == 1:
                    return f"<h1>{content}</h1>"
                elif level == 2:
                    return f"<h2>{content}</h2>"
                elif level == 3:
                    return f"<h3>{content}</h3>"
                else:
                    return f"<h4>{content}</h4>"
            
            elif item['type'] == 'text':
                content = re.sub(r'\*\*(.*?)\*\*', r'\1', item['content'])
                return f"<p>{content}</p>"
            
            elif item['type'] == 'bullet':
                content = re.sub(r'\*\*(.*?)\*\*', r'\1', item['content'])
                return f"<li>{content}</li>"
            
            elif item['type'] == 'table':
                table_data = item['content']
                table_html = "<table class='content-table'>"
                
                if table_data['headers']:
                    table_html += "<thead><tr>"
                    for header in table_data['headers']:
                        header = re.sub(r'\*\*(.*?)\*\*', r'\1', header)
                        table_html += f"<th>{header}</th>"
                    table_html += "</tr></thead>"
                
                table_html += "<tbody>"
                for row in table_data['rows']:
                    table_html += "<tr>"
                    for cell in row:
                        cell = re.sub(r'\*\*(.*?)\*\*', r'\1', cell)
                        table_html += f"<td>{cell}</td>"
                    table_html += "</tr>"
                table_html += "</tbody>"
                
                table_html += "</table>"
                return table_html
            
            return content_html
        
        # Generate all content HTML as a list
        all_content_html = []
        
        # Handle CURRENT AFFAIRS section
        if parsed_data['current_affairs']['questions']:
            qa_html = ["<div class='qa-section'>"]
            qa_html.append("<h2>Questions</h2>")
            for i, question in enumerate(parsed_data['current_affairs']['questions']):
                qa_html.append(f"<p><strong>Q{i+1}.</strong> {question}</p>")
            if parsed_data['current_affairs']['answers']:
                qa_html.append("<h2>Answers</h2>")
                for i, answer in enumerate(parsed_data['current_affairs']['answers']):
                    qa_html.append(f"<p><strong>A{i+1}.</strong> {answer}</p>")
            qa_html.append("</div>")
            all_content_html.append("".join(qa_html))
        
        # Process all content items
        skip_first_heading = True
        current_section = None
        in_bullet_list = False
        bullet_items = []
        
        for i, item in enumerate(parsed_data['all_content']):
            if skip_first_heading and item['type'] == 'heading' and item['level'] == 1:
                skip_first_heading = False
                continue
                
            if current_section == 'CURRENT AFFAIRS' and item['type'] == 'table':
                continue
                
            if item['type'] == 'heading' and item['level'] == 1:
                if in_bullet_list:
                    all_content_html.append("<ul>" + "".join(bullet_items) + "</ul>")
                    bullet_items = []
                    in_bullet_list = False
                current_section = item['content']
            
            if item['type'] == 'bullet':
                if not in_bullet_list:
                    in_bullet_list = True
                bullet_items.append(generate_html_for_content(item, image_files))
                if i == len(parsed_data['all_content']) - 1 or parsed_data['all_content'][i+1]['type'] != 'bullet':
                    all_content_html.append("<ul>" + "".join(bullet_items) + "</ul>")
                    bullet_items = []
                    in_bullet_list = False
            else:
                if in_bullet_list:
                    all_content_html.append("<ul>" + "".join(bullet_items) + "</ul>")
                    bullet_items = []
                    in_bullet_list = False
                html = generate_html_for_content(item, image_files)
                if html:
                    all_content_html.append(html)
        
        # Combine all HTML content into a single string
        content_html = "".join(all_content_html)
        
        # Prepare template data with single content string
        template_data = {
            'content': content_html,
            'date': parsed_data['date'] or 'Newsletter'
        }
        
        # Render template and generate PDF
        try:
            main_template = env.get_template("simple_layout.html")
            full_html = main_template.render(template_data)
            logging.debug(f"Rendered HTML length: {len(full_html)}")
            
            html_path = os.path.join(OUTPUT_DIR, f"debug_{request_id}.html")
            with open(html_path, 'w') as f:
                f.write(full_html)
            logging.debug(f"Saved debug HTML to {html_path}")
            
            pdf_filename = f"newsletter_{request_id}.pdf"
            pdf_path = os.path.join(OUTPUT_DIR, pdf_filename)
            
            HTML(string=full_html, base_url=request_dir).write_pdf(pdf_path)
            
            return {
                "success": True,
                "message": "PDF generated successfully",
                "pdf_url": f"/api/download/{pdf_filename}",
                "filename": "newsletter.pdf",
                "size": os.path.getsize(pdf_path) / 1024
            }
        except Exception as template_error:
            logging.error(f"Template rendering or PDF generation error: {str(template_error)}")
            logging.error(traceback.format_exc())
            raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(template_error)}")
    
    except Exception as e:
        logging.error(f"Error during PDF generation: {str(e)}")
        logging.error(traceback.format_exc())
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
    print("Noteglider API started")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)