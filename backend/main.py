import logging
import traceback
import os
import re
import shutil
import zipfile
import tempfile
import markdown
import uuid
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from weasyprint import HTML
from typing import Optional
from jinja2 import Environment, FileSystemLoader
from bs4 import BeautifulSoup

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Newsletter Generator API")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define directories
TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)
OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Set up Jinja2 environment
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
        in_outline = False
        
        # Date pattern for DD-MM-YY or DD1+DD2-MM-YY
        date_pattern = re.compile(r'^\s*\*?\*?(\d{1,2}(\+\d{1,2})?-\d{1,2}-\d{2,4})\*?\*?\s*$')
        separator_pattern = re.compile(r'^\s*[:\-]+\s*$')
        
        # Capture the first date line for the header
        for line in lines:
            stripped_line = line.lstrip('#').strip()
            if date_pattern.match(stripped_line):
                parsed_data['date'] = stripped_line
                break
        
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            
            if not line:
                i += 1
                continue
            
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
                heading_text_clean = re.sub(r'\*\*(.*?)\*\*', r'\1', heading_text).strip().upper()
                
                if heading_level == 1:
                    if heading_text_clean == 'CURRENT AFFAIRS':
                        current_section = 'CURRENT AFFAIRS'
                        in_outline = False
                        i += 1
                        continue
                    elif heading_text_clean == 'OUTLINE':
                        current_section = 'OUTLINE'
                        in_outline = True
                        i += 1
                        continue
                    else:
                        current_section = heading_text
                        in_outline = False
                        parsed_data['all_content'].append({
                            'type': 'heading',
                            'level': heading_level,
                            'content': heading_text
                        })
                elif heading_level == 2 and not in_outline:
                    i += 1
                    continue
                elif not in_outline:
                    parsed_data['all_content'].append({
                        'type': 'heading',
                        'level': heading_level,
                        'content': heading_text,
                        'parent': current_section
                    })
            
            elif in_outline:
                i += 1
                continue
            
            elif line.startswith('|') and current_section == 'CURRENT AFFAIRS':
                table_rows = []
                while i < len(lines) and lines[i].strip().startswith('|'):
                    row = lines[i].strip()
                    cells = [cell.strip() for cell in row.split('|')[1:-1]]
                    if cells and not any(separator_pattern.match(cell) for cell in cells):
                        table_rows.append(cells)
                    i += 1
                if table_rows and len(table_rows) > 1:
                    for row in table_rows[1:]:
                        if len(row) >= 2:
                            parsed_data['current_affairs']['questions'].append(row[0])
                            parsed_data['current_affairs']['answers'].append(row[1])
                continue
            
            elif line.startswith('|') and not in_outline:
                # Process tables in other sections
                table_rows = []
                headers = []
                
                # Process header row
                row = lines[i].strip()
                header_cells = [cell.strip() for cell in row.split('|')[1:-1]]
                if header_cells:
                    headers = header_cells
                    i += 1
                    
                    # Skip separator row (if present)
                    if i < len(lines) and lines[i].strip().startswith('|') and '-' in lines[i]:
                        i += 1
                
                # Process table rows
                while i < len(lines) and lines[i].strip().startswith('|'):
                    row = lines[i].strip()
                    cells = [cell.strip() for cell in row.split('|')[1:-1]]
                    if cells:
                        table_rows.append(cells)
                    i += 1
                
                # Add table to all_content
                if table_rows:
                    parsed_data['all_content'].append({
                        'type': 'table',
                        'content': {
                            'headers': headers,
                            'rows': table_rows
                        },
                        'parent': current_section
                    })
                continue
            
            elif not in_outline:
                if line.startswith('*'):
                    content = line.lstrip('*').strip()
                    content = re.sub(r'\*\*(.*?)\*\*', r'\1', content)
                    parsed_data['all_content'].append({
                        'type': 'bullet',
                        'content': content,
                        'parent': current_section
                    })
                elif not line.startswith('#') and not line.startswith('|'):
                    content = re.sub(r'\*\*(.*?)\*\*', r'\1', line)
                    parsed_data['all_content'].append({
                        'type': 'text',
                        'content': content,
                        'parent': current_section
                    })
            
            i += 1
        
        logging.debug(f"Parsed {len(parsed_data['all_content'])} content items")
        return parsed_data
        
    except Exception as e:
        logging.error(f"Error parsing markdown: {str(e)}")
        logging.error(traceback.format_exc())
        raise ValueError(f"Failed to parse markdown: {str(e)}")

def wrap_h1_with_separator(html):
    soup = BeautifulSoup(html, 'html.parser')
    h1_count = len(soup.find_all('h1'))
    logger.debug(f"Found {h1_count} H1 tags to process")
    for h1 in soup.find_all('h1'):
        category = h1.text.strip()
        separator = soup.new_tag('div', **{'class': 'separator-container'})
        line1 = soup.new_tag('div', **{'class': 'separator-line'})
        text_div = soup.new_tag('div', **{'class': 'separator-text'})
        text_div.string = category
        line2 = soup.new_tag('div', **{'class': 'separator-line'})
        separator.append(line1)
        separator.append(text_div)
        separator.append(line2)
        h1.replace_with(separator)
    return str(soup)

def wrap_tables(html):
    soup = BeautifulSoup(html, 'html.parser')
    for table in soup.find_all('table'):
        rows = table.find_all('tr')
        if rows:
            first_row = rows[0]
            cells = first_row.find_all(['th', 'td'])
            if len(cells) == 1 and cells[0].text.strip() == 'Important Qs':
                first_row.extract()
                outer = soup.new_tag('div', **{'class': 'outer-container'})
                title = soup.new_tag('div', **{'class': 'table-title'})
                title.string = 'Important Q&A'
                inner = soup.new_tag('div', **{'class': 'inner-table-container'})
                table.wrap(inner)
                inner.wrap(outer)
                outer.insert(0, title)
                table['class'] = table.get('class', []) + ['question-table']
            elif len(cells) == 2 and cells[0].text.strip() == '' and cells[1].text.strip() == 'Answers':
                first_row.extract()
                outer = soup.new_tag('div', **{'class': 'outer-container answer'})
                title = soup.new_tag('div', **{'class': 'table-title'})
                title.string = 'Answers'
                inner = soup.new_tag('div', **{'class': 'inner-table-container'})
                table.wrap(inner)
                inner.wrap(outer)
                outer.insert(0, title)
                table['class'] = table.get('class', []) + ['answer-table']
    return str(soup)

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
        logger.info(f"Created request directory: {request_dir}")

        # Save uploaded markdown file
        md_path = os.path.join(request_dir, markdown_file.filename)
        with open(md_path, "wb") as f:
            shutil.copyfileobj(markdown_file.file, f)
        logger.info(f"Saved markdown file: {md_path}")

        # Extract and sort images from zip
        images_dir = os.path.join(request_dir, "images")
        os.makedirs(images_dir, exist_ok=True)
        zip_path = os.path.join(request_dir, images_zip.filename)
        
        with open(zip_path, "wb") as f:
            shutil.copyfileobj(images_zip.file, f)
        logger.info(f"Saved ZIP file: {zip_path}")

        image_files = []
        try:
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(images_dir)
            if os.path.exists(images_dir):
                for root, dirs, files in os.walk(images_dir):
                    for file in files:
                        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                            rel_path = os.path.relpath(os.path.join(root, file), images_dir)
                            image_files.append(rel_path)
                image_files.sort(key=lambda x: int(re.match(r'^(\d+)-', os.path.basename(x)).group(1)) 
                                 if re.match(r'^(\d+)-', os.path.basename(x)) else float('inf'))
            logger.debug(f"Sorted image files by index: {image_files}")
            if not image_files:
                logger.warning(f"No image files found in {images_dir}")
        except zipfile.BadZipFile:
            logger.error(f"Bad ZIP file: {zip_path}")
            raise HTTPException(status_code=400, detail="The uploaded file is not a valid ZIP archive")
        except Exception as zip_error:
            logger.error(f"Error extracting ZIP file: {str(zip_error)}")
            raise HTTPException(status_code=400, detail=f"Unable to extract ZIP file: {str(zip_error)}")

        # Copy static assets
        static_source = os.path.abspath('static')
        static_dest = os.path.join(request_dir, 'static')
        shutil.copytree(static_source, static_dest, dirs_exist_ok=True)
        logger.info(f"Copied static assets from {static_source} to {static_dest}")

        # Parse markdown content
        try:
            with open(md_path, "r", encoding="utf-8") as f:
                md_content = f.read()
            parsed_data = parse_markdown(md_content)
            logger.info(f"Successfully parsed markdown content. Date: {parsed_data.get('date', 'Not found')}")
        except Exception as md_error:
            logger.error(f"Error parsing markdown: {str(md_error)}")
            logger.error(traceback.format_exc())
            raise HTTPException(status_code=400, detail=f"Error parsing markdown: {str(md_error)}")

        # Assign images to level 3 headings
        h3_index = 0
        for item in parsed_data['all_content']:
            if item['type'] == 'heading' and item['level'] == 3:
                if h3_index < len(image_files):
                    item['image'] = image_files[h3_index]
                    h3_index += 1
        logger.debug(f"Assigned {h3_index} images to level 3 headings")
        if h3_index == 0 and any(item['type'] == 'heading' and item['level'] == 3 for item in parsed_data['all_content']):
            logger.warning("No images assigned to level 3 headings, possibly due to no images found or naming mismatch")

        # Load and process SVG files
        svg_dir = 'templates'
        
        # Helper function to fix relative icon paths in SVGs
        def fix_svg_icon_paths(svg_content):
            soup = BeautifulSoup(svg_content, 'xml')
            # Find all image elements with xlink:href attributes
            images = soup.find_all('image')
            for img in images:
                href = img.get('xlink:href')
                if href and href.startswith('static/'):
                    # Convert to absolute path
                    absolute_path = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), href))
                    # Use file:// URL format for absolute paths
                    file_url = f"file://{absolute_path}"
                    img['xlink:href'] = file_url
                    logger.debug(f"Updated image path from {href} to {file_url}")
            return str(soup)
        
        first_header_path = os.path.join(svg_dir, 'Header-Main.svg')
        if os.path.exists(first_header_path):
            try:
                with open(first_header_path, 'r', encoding='utf-8') as f:
                    first_header_svg = f.read()
                # First update the date
                soup = BeautifulSoup(first_header_svg, 'xml')
                date_label = soup.find('text', {'id': 'date-label'})
                if date_label:
                    actual_date = parsed_data.get('date', 'DD/MM/YY')
                    date_label.string = actual_date
                    logger.debug(f"Updated date in Header-Main.svg to: {actual_date}")
                first_header_svg = str(soup)
                # Then fix the icon paths
                first_header_svg = fix_svg_icon_paths(first_header_svg)
            except Exception as e:
                logger.error(f"Failed to process Header-Main.svg: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Failed to process Header-Main.svg: {str(e)}")
        else:
            logger.error(f"Header-Main.svg not found at {first_header_path}")
            raise HTTPException(status_code=500, detail="Header-Main.svg is missing")

        header_path = os.path.join(svg_dir, 'Header-Constant.svg')
        if os.path.exists(header_path):
            try:
                with open(header_path, 'r', encoding='utf-8') as f:
                    header_svg = f.read()
                # Fix icon paths
                header_svg = fix_svg_icon_paths(header_svg)
                logger.debug("Loaded Header-Constant.svg successfully")
            except Exception as e:
                logger.error(f"Failed to load Header-Constant.svg: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Failed to load Header-Constant.svg: {str(e)}")
        else:
            logger.error(f"Header-Constant.svg not found at {header_path}")
            raise HTTPException(status_code=500, detail="Header-Constant.svg is missing")

        footer_path = os.path.join(svg_dir, 'Footer-Constant.svg')
        if os.path.exists(footer_path):
            try:
                with open(footer_path, 'r', encoding='utf-8') as f:
                    footer_svg = f.read()
                # Fix icon paths
                footer_svg = fix_svg_icon_paths(footer_svg)
                logger.debug("Loaded Footer-Constant.svg successfully")
            except Exception as e:
                logger.error(f"Failed to load Footer-Constant.svg: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Failed to load Footer-Constant.svg: {str(e)}")
        else:
            logger.error(f"Footer-Constant.svg not found at {footer_path}")
            raise HTTPException(status_code=500, detail="Footer-Constant.svg is missing")

        # Helper function to generate HTML for content items
        def generate_html_for_content(item, image_files):
            content_html = ""
            date_pattern = re.compile(r'^\s*\*?\*?(\d{1,2}(\+\d{1,2})?-\d{1,2}-\d{2,4})\*?\*?\s*$')
            content_to_check = item['content'] if item['type'] in ['text', 'heading'] else ""
            if date_pattern.match(content_to_check):
                return ""
            if item['type'] == 'heading':
                level = item['level']
                # Convert markdown for bold to HTML
                content = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', item['content'])
                # Convert markdown for italic to HTML
                content = re.sub(r'\*(.*?)\*', r'<em>\1</em>', content)
                # Convert markdown for underline to HTML (using __ for underline)
                content = re.sub(r'__(.*?)__', r'<u>\1</u>', content)
                heading_html = f"<h{level} class=\"news-heading\">{content}</h{level}>"
                if level == 3:
                    if 'image' in item:
                        image_path = f"images/{item['image']}"
                        image_html = f'<img src="{image_path}" class="news-image" alt="News Image">'
                        return f'<div class="news-item"><div class="news-heading-container">{heading_html}</div><div class="news-image-container">{image_html}</div>'
                    return f'<div class="news-item">{heading_html}'
                return heading_html
            elif item['type'] == 'text':
                # Convert markdown for bold to HTML
                content = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', item['content'])
                # Convert markdown for italic to HTML
                content = re.sub(r'\*(.*?)\*', r'<em>\1</em>', content)
                # Convert markdown for underline to HTML (using __ for underline)
                content = re.sub(r'__(.*?)__', r'<u>\1</u>', content)
                return f'<div class="news-description-container"><p class="news-description">{content}</p></div></div>'  # Close news-item div
            elif item['type'] == 'bullet':
                # Convert markdown for bold to HTML
                content = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', item['content'])
                # Convert markdown for italic to HTML
                content = re.sub(r'\*(.*?)\*', r'<em>\1</em>', content)
                # Convert markdown for underline to HTML (using __ for underline)
                content = re.sub(r'__(.*?)__', r'<u>\1</u>', content)
                return f"<li>{content}</li>"
            elif item['type'] == 'table':
                table_data = item['content']
                
                # Check if the table starts with "About"
                is_about_table = False
                if table_data['headers'] and len(table_data['headers']) > 0:
                    first_header = re.sub(r'\*\*(.*?)\*\*', r'\1', table_data['headers'][0])
                    is_about_table = first_header.strip().startswith('About')
                
                # Create table HTML with appropriate class
                table_class = 'content-table about-table' if is_about_table else 'content-table full-width-table'
                table_html = f"<table class='{table_class}'>"
                
                # Get number of columns in the table
                num_columns = 0
                if table_data['rows'] and len(table_data['rows']) > 0:
                    num_columns = len(table_data['rows'][0])
                else:
                    num_columns = len(table_data['headers'])
                
                # Start thead section
                table_html += "<thead>"
                
                # Process header row (title row)
                if table_data['headers']:
                    table_html += "<tr>"
                    
                    # Process headers
                    for i, header in enumerate(table_data['headers']):
                        # Convert markdown for bold to HTML
                        header = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', header)
                        # Convert markdown for italic to HTML
                        header = re.sub(r'\*(.*?)\*', r'<em>\1</em>', header)
                        # Convert markdown for underline to HTML (using __ for underline)
                        header = re.sub(r'__(.*?)__', r'<u>\1</u>', header)
                        
                        # For first header cell, make it span all columns
                        if i == 0:
                            table_html += f"<th colspan=\"{num_columns}\">{header}</th>"
                            # Skip remaining headers as we've spanned all columns
                            break
                    
                    table_html += "</tr>"
                
                # For non-About tables, include the first data row (column headers) in thead
                # so it repeats when the table breaks across pages
                if not is_about_table and table_data['rows'] and len(table_data['rows']) > 0:
                    # First data row with column descriptions
                    row = table_data['rows'][0]
                    table_html += '<tr class="highlight-row thead-column-headers">'
                    for cell in row:
                        # Convert markdown for bold to HTML
                        cell = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', cell)
                        # Convert markdown for italic to HTML
                        cell = re.sub(r'\*(.*?)\*', r'<em>\1</em>', cell)
                        # Convert markdown for underline to HTML (using __ for underline)
                        cell = re.sub(r'__(.*?)__', r'<u>\1</u>', cell)
                        table_html += f"<th>{cell}</th>"
                    table_html += "</tr>"
                
                # Close thead section
                table_html += "</thead>"
                
                # Start tbody section
                table_html += "<tbody>"
                
                # Process remaining data rows
                start_idx = 1 if not is_about_table else 0  # Skip first row for non-About tables
                for i, row in enumerate(table_data['rows'][start_idx:], start=start_idx):
                    table_html += "<tr>"
                    for cell in row:
                        # Convert markdown for bold to HTML
                        cell = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', cell)
                        # Convert markdown for italic to HTML
                        cell = re.sub(r'\*(.*?)\*', r'<em>\1</em>', cell)
                        # Convert markdown for underline to HTML (using __ for underline)
                        cell = re.sub(r'__(.*?)__', r'<u>\1</u>', cell)
                        table_html += f"<td>{cell}</td>"
                    table_html += "</tr>"
                
                table_html += "</tbody>"
                table_html += "</table>"
                
                # Return table HTML or add to full-width collection
                if is_about_table:
                    return table_html
                else:
                    # For full-width tables, add to separate collection and return empty string
                    full_width_tables_html.append(table_html)
                    return ""
            return content_html

        # Generate all content HTML
        all_content_html = []
        full_width_tables_html = []
        
        # Add Question Table at the beginning
        if parsed_data['current_affairs']['questions']:
            question_html = ["<table><tr><th>Important Qs</th></tr>"]
            for question in parsed_data['current_affairs']['questions']:
                question_html.append(f"<tr><td>{question}</td></tr>")
            question_html.append("</table>")
            all_content_html.append("".join(question_html))

        # Process main content
        current_section = None
        in_bullet_list = False
        bullet_items = []

        for i, item in enumerate(parsed_data['all_content']):
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

        # Add Answer Table at the end
        if parsed_data['current_affairs']['answers']:
            answer_html = ["<table><tr><th></th><th>Answers</th></tr>"]
            for i, answer in enumerate(parsed_data['current_affairs']['answers'], start=1):
                answer_html.append(f"<tr><td>{i}</td><td>{answer}</td></tr>")
            answer_html.append("</table>")
            all_content_html.append("".join(answer_html))

        content_html = "".join(all_content_html)
        logger.debug(f"Generated content HTML length: {len(content_html)}")

        # Process full-width tables if any exist
        full_width_tables_content = ""
        if full_width_tables_html:
            full_width_tables_content = "<div class='full-width-tables-container'>" + "".join(full_width_tables_html) + "</div>"
            logger.debug(f"Generated {len(full_width_tables_html)} full-width tables")

        content_html = wrap_h1_with_separator(content_html)
        logger.debug("Applied H1 separator transformation")
        content_html = wrap_tables(content_html)
        logger.debug("Applied table wrapping transformation")

        # Prepare template data
        template_data = {
            'content': content_html,
            'full_width_tables': full_width_tables_content,
            'first_header_svg': first_header_svg,
            'header_svg': header_svg,
            'footer_svg': footer_svg,
        }

        # Render template and generate PDF
        try:
            main_template = env.get_template("simple_layout.html")
            full_html = main_template.render(template_data)
            logger.debug(f"Rendered HTML length: {len(full_html)}")

            html_path = os.path.join(OUTPUT_DIR, f"debug_{request_id}.html")
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(full_html)
            logger.info(f"Saved debug HTML to {html_path}")

            pdf_filename = f"newsletter_{request_id}.pdf"
            pdf_path = os.path.join(OUTPUT_DIR, pdf_filename)
            HTML(string=full_html, base_url=request_dir).write_pdf(pdf_path)
            logger.info(f"Generated PDF at {pdf_path}")

            return {
                "success": True,
                "message": "PDF generated successfully",
                "pdf_url": f"/api/download/{pdf_filename}",
                "filename": "newsletter.pdf",
                "size": os.path.getsize(pdf_path) / 1024
            }
        except Exception as template_error:
            logger.error(f"Template rendering or PDF generation error: {str(template_error)}")
            logger.error(traceback.format_exc())
            raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(template_error)}")

    except Exception as e:
        logger.error(f"Error during PDF generation: {str(e)}")
        logger.error(traceback.format_exc())
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