import logging
import traceback
import os
import re
import shutil
import zipfile
import uuid
from fastapi import UploadFile, HTTPException
from weasyprint import HTML
from typing import Optional
from jinja2 import Environment, FileSystemLoader
from bs4 import BeautifulSoup
from pathlib import Path
from typing import Dict, List, Tuple
import glob

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

TEMP_DIR = "temp"
OUTPUT_DIR = "output"
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

        date_pattern = re.compile(r'^\s*\*{0,2}(\d{1,2}(?:[+-]\d{1,2})?[-/]\d{1,2}[-/]\d{2,4})\*{0,2}\s*$')
        separator_pattern = re.compile(r'^\s*[-:/]+\s*$')
        
        for line in lines:
            stripped_line = line.lstrip('#').strip()
            if date_pattern.match(stripped_line):
                parsed_data['date'] = stripped_line
                break
        
        i = 0

        # Add patterns for list detection
        numbered_list_pattern = re.compile(r'^\s*(\d+)\.\s+(.+)$')
        nested_content_pattern = re.compile(r'^\s+(.+)$')
        current_list = None  # Track current list being processed
        current_list_items = []
        indent_level = 0

        # Add improved list detection patterns
        bullet_pattern = re.compile(r'^\s*\*\s+(.+)$')  # Matches only explicit bullet points
        indented_text_pattern = re.compile(r'^\s+(.+)$')  # Matches indented text
        numbered_list_pattern = re.compile(r'^\s*(\d+)\.\s+(.+)$')

        def is_indented_list_item(line: str) -> bool:
            """Check if a line is part of an indented list"""
            stripped = line.lstrip()
            indent = len(line) - len(stripped)
            return indent >= 2 and not bullet_pattern.match(line) and not numbered_list_pattern.match(line)

        def process_list_section(start_idx: int, lines: list[str]) -> tuple[list[dict], int]:
            """Process a section of text that might contain lists and indented content"""
            items = []
            current_item = None
            i = start_idx

            while i < len(lines):
                line = lines[i].rstrip()
                if not line:
                    break

                bullet_match = bullet_pattern.match(line)
                if bullet_match:
                    if current_item:
                        items.append(current_item)
                    current_item = {
                        'type': 'bullet',
                        'content': bullet_match.group(1),
                        'nested': []
                    }
                    i += 1
                    continue

                if is_indented_list_item(line):
                    if current_item:
                        current_item['nested'].append({
                            'content': line.lstrip(),
                            'indent': len(line) - len(line.lstrip())
                        })
                    else:
                        # Create a new bullet point for indented text without an explicit bullet
                        current_item = {
                            'type': 'bullet',
                            'content': line.lstrip(),
                            'nested': []
                        }
                    i += 1
                    continue

                break

            if current_item:
                items.append(current_item)

            return items, i

        while i < len(lines):
            line = lines[i].strip()
            original_line = lines[i]  # Keep original line for indentation
            
            if not line:
                if current_list:
                    # Add completed list to content
                    parsed_data['all_content'].append({
                        'type': current_list['type'],
                        'items': current_list['items'],
                        'parent': current_section
                    })
                    current_list = None
                    current_list_items = []
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
                    if heading_text_clean == 'WEEKLY CURRENT AFFAIRS':
                        current_section = 'WEEKLY CURRENT AFFAIRS'
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
            
            elif line.startswith('|') and current_section == 'WEEKLY CURRENT AFFAIRS':
                table_rows = []
                while i < len(lines) and lines[i].strip().startswith('|'):
                    row = lines[i].strip()
                    cells = [cell.strip() for cell in row.split('|')[1:-1]]
                    if cells and not any(separator_pattern.match(cell) for cell in cells):
                        table_rows.append(cells)
                    i += 1
                
                if table_rows:
                    questions, answers = parse_current_affairs_table(table_rows)
                    parsed_data['current_affairs']['questions'].extend(questions)
                    parsed_data['current_affairs']['answers'].extend(answers)
                    logger.debug(f"Parsed {len(questions)} Q&A pairs from weekly current affairs table")
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
            
            # Check for numbered list
            numbered_match = numbered_list_pattern.match(line)
            if numbered_match and not in_outline:
                if not current_list or current_list['type'] != 'numbered':
                    if current_list:
                        parsed_data['all_content'].append(current_list)
                    current_list = {'type': 'numbered', 'items': []}
                current_list['items'].append({
                    'number': numbered_match.group(1),
                    'content': numbered_match.group(2),
                    'nested': []
                })
                i += 1
                # Look for nested content
                while i < len(lines):
                    nested_line = lines[i].rstrip()
                    if not nested_line or not nested_line[0].isspace():
                        break
                    nested_content = nested_line.lstrip()
                    if nested_content:
                        current_list['items'][-1]['nested'].append({
                            'content': nested_content,
                            'indent': len(nested_line) - len(nested_line.lstrip())
                        })
                    i += 1
                continue

            # Modify existing bullet point handling
            if line.startswith('*') and not in_outline:
                content = line[1:].strip()
                if not current_list or current_list['type'] != 'bullet':
                    if current_list:
                        parsed_data['all_content'].append(current_list)
                    current_list = {'type': 'bullet', 'items': []}
                current_list['items'].append({
                    'content': content,
                    'nested': []
                })
                i += 1
                # Look for nested content
                while i < len(lines):
                    nested_line = lines[i].rstrip()
                    if not nested_line or not nested_line[0].isspace():
                        break
                    nested_content = nested_line.lstrip()
                    if nested_content:
                        current_list['items'][-1]['nested'].append({
                            'content': nested_content,
                            'indent': len(nested_line) - len(nested_line.lstrip())
                        })
                    i += 1
                continue

            # Modified text content handling
            elif not line.startswith('#') and not line.startswith('|') and not in_outline:
                if bullet_pattern.match(original_line) or is_indented_list_item(original_line):
                    items, i = process_list_section(i, lines)
                    if items:
                        parsed_data['all_content'].append({
                            'type': 'list',
                            'items': items,
                            'parent': current_section
                        })
                else:
                    # Regular text content
                    parsed_data['all_content'].append({
                        'type': 'text',
                        'content': original_line.strip(),
                        'parent': current_section
                    })
                    i += 1
                continue
            
            i += 1

        # Add remaining content after loop ends
        if current_list:
            parsed_data['all_content'].append({
                'type': current_list['type'],
                'items': current_list['items'],
                'parent': current_section
            })
            current_list = None
            current_list_items = []

        logging.debug(f"Parsed {len(parsed_data['all_content'])} content items")
        return parsed_data
        
    except Exception as e:
        logging.error(f"Error parsing markdown: {str(e)}")
        logging.error(traceback.format_exc())
        raise ValueError(f"Failed to parse markdown: {str(e)}")

def parse_current_affairs_table(table_rows: List[List[str]]) -> Tuple[List[Dict], List[Dict]]:
    """Parse 3-column current affairs table into questions and answers with separate serial numbers."""
    questions = []
    answers = []
    
    start_idx = 1 if len(table_rows) > 0 and 'N' in table_rows[0][0].upper() else 0
    
    for row in table_rows[start_idx:]:
        if len(row) >= 3:
            serial = row[0].strip()
            question = row[1].strip()
            answer = row[2].strip()
            questions.append({'serial': serial, 'text': question})
            answers.append({'serial': serial, 'text': answer})
    
    return questions, answers

def process_qa_tables(questions: List[Dict], answers: List[Dict]) -> dict:
    """Process Q&A data into formatted two-column tables without header rows."""
    # Generate questions table HTML with two columns, no header
    questions_html = ''.join(
        [f'<tr><td>{q["serial"]}</td><td>{q["text"]}</td></tr>' for q in questions]
    )
    
    total_answers = len(answers)
    if (total_answers == 0):
        return {'questions': questions_html, 'answers': []}
    
    # Calculate answers per table and generate three answer tables
    answers_per_table = max(1, (total_answers + 2) // 3)
    answer_tables = []
    for i in range(0, total_answers, answers_per_table):
        table_answers = answers[i:i + answers_per_table]
        if table_answers:
            first_serial = table_answers[0]['serial']
            last_serial = table_answers[-1]['serial']
            table_content = ''.join(
                [f'<tr><td>{a["serial"]}</td><td>{a["text"]}</td></tr>' for a in table_answers]
            )
            answer_tables.append({
                'range': f'({first_serial}-{last_serial})',
                'content': table_content
            })
    
    return {'questions': questions_html, 'answers': answer_tables}

def wrap_h1_with_separator(html):
    soup = BeautifulSoup(html, 'html.parser')
    h1_count = len(soup.find_all('h1'))
    logger.debug(f"Found {h1_count} H1 tags to process")
    
    for h1 in soup.find_all('h1'):
        category = h1.text.strip()
        # Skip certain categories that shouldn't have separators
        if category.upper() in ['OUTLINE', 'CURRENT AFFAIRS']:
            continue
            
        separator = soup.new_tag('div', **{'class': 'separator-container'})
        line1 = soup.new_tag('div', **{'class': 'separator-line'})
        text_div = soup.new_tag('div', **{'class': 'separator-text'})
        text_div.string = category
        line2 = soup.new_tag('div', **{'class': 'separator-line'})
        
        separator.append(line1)
        separator.append(text_div)
        separator.append(line2)
        
        # Insert separator before the h1 and then remove h1
        h1.insert_before(separator)
        h1.decompose()
    
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

def process_zip_file(zip_file: UploadFile, request_dir: str) -> Dict[str, List[str]]:
    """Process ZIP file and extract images by category."""
    zip_path = os.path.join(request_dir, zip_file.filename)
    images_dir = os.path.join(request_dir, "images")
    category_images: Dict[str, List[str]] = {}
    
    with open(zip_path, "wb") as f:
        shutil.copyfileobj(zip_file.file, f)

    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        # Get all directories sorted alphabetically
        dirs = sorted([f for f in zip_ref.namelist() if f.endswith('/')])
        
        for dir_path in dirs:
            # Extract category name from path
            if "NEWS-CATEGORY" in dir_path:
                category = dir_path.split('/')[-2]
                # Get all images in this category directory
                images = sorted([
                    f for f in zip_ref.namelist() 
                    if f.startswith(dir_path) and 
                    f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))
                ], key=lambda x: int(re.search(r'^(\d+)', os.path.basename(x)).group(1)))
                
                # Extract images
                for img_path in images:
                    extract_path = os.path.join(images_dir, category)
                    os.makedirs(extract_path, exist_ok=True)
                    zip_ref.extract(img_path, extract_path)
                    
                    rel_path = os.path.relpath(
                        os.path.join(extract_path, img_path), 
                        request_dir
                    )
                    if category not in category_images:
                        category_images[category] = []
                    category_images[category].append(rel_path)

    return category_images

def extract_highlights(html: str) -> tuple[str, list[str]]:
    """Extract highlights section and return modified HTML and highlights list."""
    soup = BeautifulSoup(html, 'html.parser')
    highlights_section = None
    highlights_list = []

    # Find the HIGHLIGHTS section
    for h1 in soup.find_all('h1'):
        if 'HIGHLIGHTS OF THIS WEEK' in h1.text.strip().upper():
            # Get all content until next h1
            current = h1.next_sibling
            while current and (not current.name == 'h1' if hasattr(current, 'name') else True):
                if current.name == 'ul' or current.name == 'ol':
                    for item in current.find_all('li'):
                        highlights_list.append(item.text.strip())
                current = current.next_sibling
            
            # Remove the section
            current = h1
            next_h1 = h1.find_next('h1')
            while current and current != next_h1:
                next_elem = current.next_sibling
                current.decompose()
                current = next_elem
            break

    logger.debug(f"Extracted {len(highlights_list)} highlights")
    return str(soup), highlights_list

def extract_index(html: str) -> tuple[str, list[tuple[str, str]]]:
    """Extract index section and return modified HTML and index list."""
    soup = BeautifulSoup(html, 'html.parser')
    index_section = None
    index_list = []

    # Find the INDEX section
    for h1 in soup.find_all('h1'):
        if 'INDEX' in h1.text.strip().upper():
            # Get all content until next h1
            current = h1.next_sibling
            while current and (not current.name == 'h1' if hasattr(current, 'name') else True):
                if current.name == 'ul' or current.name == 'ol':
                    for item in current.find_all('li'):
                        index_list.append((item.text.strip(), 'x'))  # Default page number
                current = current.next_sibling
            
            # Find and map page numbers
            if index_list:
                page_map = {}
                current_page = 1
                for tag in soup.find_all('h1'):
                    heading = tag.text.strip().upper()
                    if heading not in ['INDEX', 'HIGHLIGHTS OF THIS WEEK']:
                        page_map[heading] = current_page
                        current_page += 1
                
                # Update page numbers
                index_list = [(text, str(page_map.get(text.upper(), 'x'))) for text, _ in index_list]
            
            # Remove the section
            current = h1
            next_h1 = h1.find_next('h1')
            while current and current != next_h1:
                next_elem = current.next_sibling
                current.decompose()
                current = next_elem
            break

    logger.debug(f"Extracted {len(index_list)} index items")
    return str(soup), index_list

async def generate_compilation(
    markdown_file: UploadFile,
    images_zip: UploadFile,
    custom_url: Optional[str] = None
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

        # Process ZIP file first to get category-wise images
        category_images = process_zip_file(images_zip, request_dir)
        
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

        # Assign images to headings based on category
        current_category = None
        category_image_index = {}
        
        for item in parsed_data['all_content']:
            if item['type'] == 'heading':
                if item['level'] == 1:
                    # This is a category heading
                    current_category = item['content'].upper()
                    category_image_index[current_category] = 0
                elif item['level'] == 3 and current_category:
                    # This is a news headline
                    if (current_category in category_images and 
                        category_image_index[current_category] < len(category_images[current_category])):
                        item['image'] = category_images[current_category][category_image_index[current_category]]
                        category_image_index[current_category] += 1

        # Load and render headers and footer with proper date formatting
        html_dir = os.path.join('templates', 'brandings', 'weekly')
        
        # Process main header (first page)
        wk_header_main_path = os.path.join(html_dir, 'wk-header-main.html')
        with open(wk_header_main_path, 'r', encoding='utf-8') as f:
            header_main_template = env.from_string(f.read())
            
        # Format date for header
        raw_date = parsed_data.get('date', '').replace('*', '').strip()
        date_parts = raw_date.split('-')
        if len(date_parts) == 3:
            month_names = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                         'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
            try:
                month = int(date_parts[1])
                year = '20' + date_parts[2] if len(date_parts[2]) == 2 else date_parts[2]
                formatted_date = f"{month_names[month-1]}-{year}"
                
                # For document info, calculate the week range
                day = int(date_parts[0].split('+')[0])  # Take first day if there's a range
                week_end = day + 7
                week_range = f"{day:02d}/MM - {week_end:02d}/MM"
            except (IndexError, ValueError):
                formatted_date = raw_date
                week_range = "DD/MM - DD/MM"
        else:
            formatted_date = raw_date
            week_range = "DD/MM - DD/MM"

        wk_header_main_html = header_main_template.render(
            date=formatted_date,
            week_range=week_range,
            custom_url=custom_url
        )

        # Process constant header (subsequent pages)
        wk_header_constant_path = os.path.join(html_dir, 'wk-header-constant.html')
        with open(wk_header_constant_path, 'r', encoding='utf-8') as f:
            header_constant_template = env.from_string(f.read())
        wk_header_constant_html = header_constant_template.render(custom_url=custom_url)

        # Process footer
        wk_footer_path = os.path.join(html_dir, 'wk-footer.html')
        with open(wk_footer_path, 'r', encoding='utf-8') as f:
            footer_template = env.from_string(f.read())
        wk_footer_html = footer_template.render()

        # Helper function to generate HTML for content items
        def generate_html_for_content(item):
            content_html = ""
            date_pattern = re.compile(r'^\s*\*?\*?(\d{1,2}(\+\d{1,2})?-\d{1,2}-\d{2,4})\*?\*?\s*$')
            
            # Helper function to process markdown formatting
            def process_markdown_formatting(text):
                # Enhanced formatting support
                replacements = [
                    (r'\*\*\*(.*?)\*\*\*', r'<strong><em>\1</em></strong>'),  # Bold + Italic
                    (r'\*\*(.*?)\*\*', r'<strong>\1</strong>'),  # Bold
                    (r'\*(.*?)\*', r'<em>\1</em>'),  # Italic
                    (r'__(.*?)__', r'<u>\1</u>'),  # Underline
                    (r'~~(.*?)~~', r'<del>\1</del>'),  # Strikethrough
                    (r'`(.*?)`', r'<code>\1</code>')  # Inline code
                ]
                
                for pattern, replacement in replacements:
                    text = re.sub(pattern, replacement, text)
                return text

            content_to_check = item['content'] if item['type'] in ['text', 'heading'] else ""
            if date_pattern.match(content_to_check):
                return ""
                
            if item['type'] == 'heading':
                level = item['level']
                content = process_markdown_formatting(item['content'])
                
                if level == 1:
                    # Only create h1 tag, separator will be added later
                    return f"<h1>{content}</h1>"
                elif level == 3:
                    heading_html = f"<h{level} class=\"news-heading\">{content}</h{level}>"
                    if 'image' in item:
                        image_path = f"images/{item['image']}"
                        image_html = f'<img src="{image_path}" class="news-image" alt="News Image">'
                        return f'<div class="news-item"><div class="news-heading-container">{heading_html}</div><div class="news-image-container">{image_html}</div>'
                    return f'<div class="news-item">{heading_html}'
                else:
                    return f"<h{level} class=\"news-heading\">{content}</h{level}>"
            elif item['type'] == 'text':
                content = process_markdown_formatting(item['content'])
                # Remove div closure from text items
                if not content.startswith('•') and not content.lstrip().startswith('*'):
                    return f'<div class="news-description-container"><p class="news-description non-bullet">{content}</p></div>'
                return f'<div class="news-description-container"><p class="news-description">{content}</p></div>'
            elif item['type'] == 'bullet':
                html = "<ul>"
                for list_item in item['items']:
                    content = process_markdown_formatting(list_item['content'])
                    html += f"<li>{content}"
                    if list_item['nested']:
                        html += '<div class="nested-content">'
                        for nested in list_item['nested']:
                            processed = process_markdown_formatting(nested['content'])
                            indent_class = f"indent-{nested['indent'] // 2}"
                            html += f'<div class="{indent_class}">{processed}</div>'
                        html += '</div>'
                    html += "</li>"
                html += "</ul>"
                return html
            elif item['type'] == 'numbered':
                html = "<ol>"
                for list_item in item['items']:
                    content = process_markdown_formatting(list_item['content'])
                    html += f"<li>{content}"
                    if list_item['nested']:
                        html += '<div class="nested-content">'
                        for nested in list_item['nested']:
                            processed = process_markdown_formatting(nested['content'])
                            indent_class = f"indent-{nested['indent'] // 2}"
                            html += f'<div class="{indent_class}">{processed}</div>'
                        html += '</div>'
                    html += "</li>"
                html += "</ol>"
                return html
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
        news_item_open = False  # Track if we're inside a news-item div
        
        # Remove the Q&A table addition at beginning
        # Process main content
        current_section = None
        in_bullet_list = False
        bullet_items = []

        news_item_open = False
        for i, item in enumerate(parsed_data['all_content']):
            # Skip content that belongs to WEEKLY CURRENT AFFAIRS section
            if (item['type'] == 'heading' and 
                item['level'] == 1 and 
                item['content'].upper() == 'WEEKLY CURRENT AFFAIRS'):
                current_section = item['content']
                continue
            elif current_section == 'WEEKLY CURRENT AFFAIRS':
                continue

            # Rest of the content processing remains same
            if item['type'] == 'heading' and item['level'] == 1:
                if news_item_open:
                    all_content_html.append('</div>')  # Close news-item if open
                    news_item_open = False
                if in_bullet_list:
                    all_content_html.append("<ul>" + "".join(bullet_items) + "</ul>")
                    bullet_items = []
                    in_bullet_list = False
                current_section = item['content']
                # Generate and append HTML for level 1 headings
                html = generate_html_for_content(item)  # Remove image_files argument
                if html:
                    all_content_html.append(html)
            elif item['type'] == 'heading' and item['level'] == 3:
                if news_item_open:
                    all_content_html.append('</div>')  # Close previous news-item
                html = generate_html_for_content(item)  # Remove image_files argument
                all_content_html.append(html)
                news_item_open = True
            elif item['type'] == 'text':  # Removed the news_item_open condition
                html = generate_html_for_content(item)  # Remove image_files argument
                if html:  # Only append if we have content
                    if not news_item_open:  # If no news-item div is open, create one
                        all_content_html.append('<div class="news-item">')
                        news_item_open = True
                    all_content_html.append(html)
            elif item['type'] == 'bullet':
                if not in_bullet_list:
                    in_bullet_list = True
                bullet_items.append(generate_html_for_content(item))  # Remove image_files argument
                if i == len(parsed_data['all_content']) - 1 or parsed_data['all_content'][i+1]['type'] != 'bullet':
                    all_content_html.append("<ul>" + "".join(bullet_items) + "</ul>")
                    bullet_items = []
                    in_bullet_list = False
            else:
                if in_bullet_list:
                    all_content_html.append("<ul>" + "".join(bullet_items) + "</ul>")
                    bullet_items = []
                    in_bullet_list = False
                html = generate_html_for_content(item)  # Remove image_files argument
                if html:
                    all_content_html.append(html)

        # Ensure the last news-item div is closed
        if news_item_open:
            all_content_html.append('</div>')

        # Remove the Answer Table addition at the end

        content_html = "".join(all_content_html)
        logger.debug(f"Generated content HTML length: {len(content_html)}")

        # Process full-width tables if any exist
        full_width_tables_content = ""
        if full_width_tables_html:
            full_width_tables_content = "<div class='full-width-tables-container'>" + "".join(full_width_tables_html) + "</div>"
            logger.debug(f"Generated {len(full_width_tables_html)} full-width tables")

        # Extract highlights and index before other transformations
        content_html, highlights_list = extract_highlights(content_html)
        content_html, index_list = extract_index(content_html)

        # Log extracted data
        logger.debug("Highlights list: %s", highlights_list)
        logger.debug("Index list: %s", index_list)

        # Only render templates if we have data
        highlights_html = ''
        if highlights_list:
            highlights_template = env.get_template('brandings/weekly/highlights.html')
            highlights_html = highlights_template.render(highlights=highlights_list)

        index_html = ''
        if index_list:
            index_template = env.get_template('brandings/weekly/wk-index.html')
            index_html = index_template.render(index_items=index_list)

        content_html = wrap_h1_with_separator(content_html)
        logger.debug("Applied H1 separator transformation")
        content_html = wrap_tables(content_html)
        logger.debug("Applied table wrapping transformation")

        # Prepare template data
        template_data = {
            'base_url': request_dir,  # Add this line
            'header_main_html': wk_header_main_html,
            'header_constant_html': wk_header_constant_html,
            'footer_html': wk_footer_html,
            'content': content_html,
            'full_width_tables': full_width_tables_content,
            'categories': [],  # Add empty categories list if not using that structure
            'youtube_entries': []  # Add empty youtube_entries list if not using that structure
        }

        # Add these helper functions at the start of the generate_pdf function
        def sanitize_date(date_str: str) -> str:
            """Convert date string to a filename-safe format."""
            # Remove asterisks and whitespace
            date_str = date_str.replace('*', '').strip()
            # Replace slashes and other special chars with hyphens
            date_str = re.sub(r'[/\\]', '-', date_str)
            # Remove any double hyphens
            date_str = re.sub(r'-+', '-', date_str)
            return date_str

        def ensure_directory_exists(file_path: str) -> None:
            """Ensure the directory for the given file path exists."""
            directory = os.path.dirname(file_path)
            if directory and not os.path.exists(directory):
                os.makedirs(directory, exist_ok=True)

        # Debug template data before rendering
        logger.debug("Template data prepared:")
        logger.debug(f"Header main HTML length: {len(wk_header_main_html)}")
        logger.debug(f"Header constant HTML length: {len(wk_header_constant_html)}")
        logger.debug(f"Footer HTML length: {len(wk_footer_html)}")
        logger.debug(f"Content HTML length: {len(content_html)}")
        logger.debug(f"Full-width tables content length: {len(full_width_tables_content)}")

        # Update template data to match template structure
        qa_content = process_qa_tables(
            parsed_data['current_affairs']['questions'],
            parsed_data['current_affairs']['answers']
        )
        
        template_data = {
            'base_url': request_dir,
            'footer_html': wk_footer_html,
            'header_main_html': wk_header_main_html,
            'header_constant_html': wk_header_constant_html,
            'content': content_html,
            'full_width_tables': full_width_tables_content,
            'qa_content': qa_content,
            'highlights_html': highlights_html,
            'index_html': index_html
        }

        # Add debug logging for Q&A content
        logger.debug("Q&A Content Statistics:")
        logger.debug(f"Number of questions: {len(parsed_data['current_affairs']['questions'])}")
        logger.debug(f"Number of answers: {len(parsed_data['current_affairs']['answers'])}")
        logger.debug(f"Number of answer tables: {len(qa_content['answers'])}")

        try:
            main_template = env.get_template("compilationLayout.html")
            full_html = main_template.render(template_data)
            
            # Add debug logging to check content
            logger.debug("Content HTML being passed:")
            logger.debug(content_html[:500])  # First 500 chars of content
            
            # Debug template variables
            logger.debug("Template variables:")
            for key, value in template_data.items():
                logger.debug(f"{key}: {len(str(value))} chars")

            # Save debug HTML
            debug_html_path = os.path.join(OUTPUT_DIR, f"debug_{request_id}.html")
            ensure_directory_exists(debug_html_path)
            with open(debug_html_path, 'w', encoding='utf-8') as f:
                f.write(full_html)
            logger.info(f"Saved debug HTML to {debug_html_path}")

            # Create PDF filename with sanitized date
            raw_date = parsed_data.get('date', 'NO-DATE')
            sanitized_date = sanitize_date(raw_date)
            pdf_filename = f"{sanitized_date}-Weekly-Compile-CROSSWORD.pdf"
            
            # Ensure PDF output directory exists
            pdf_path = os.path.join(OUTPUT_DIR, pdf_filename)
            ensure_directory_exists(pdf_path)
            
            # Generate PDF
            logger.debug(f"Generating PDF at path: {pdf_path}")
            HTML(string=full_html, base_url=request_dir).write_pdf(pdf_path)
            logger.info(f"Generated PDF: {pdf_filename}")

            return {
                "success": True,
                "message": "PDF generated successfully",
                "pdf_url": f"/api/download/{pdf_filename}",
                "filename": pdf_filename,
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

    except Exception as e:
        logger.error(f"Error during PDF generation: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))