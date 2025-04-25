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
        while i < len(lines):
            line = lines[i].strip()
            original_line = lines[i]
            
            if not line:
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
            
            # Simplified existing parsing logic (omitted for brevity, assumed unchanged unless relevant)
            i += 1

        logging.debug(f"Parsed {len(parsed_data['all_content'])} content items")
        return parsed_data
        
    except Exception as e:
        logging.error(f"Error parsing markdown: {str(e)}")
        logging.error(traceback.format_exc())
        raise ValueError(f"Failed to parse markdown: {str(e)}")

def parse_current_affairs_table(table_rows: List[List[str]]) -> Tuple[List[str], List[str]]:
    """Parse 3-column current affairs table into questions and answers."""
    questions = []
    answers = []
    
    start_idx = 1 if len(table_rows) > 0 and 'N' in table_rows[0][0].upper() else 0
    
    for row in table_rows[start_idx:]:
        if len(row) >= 3:
            serial = row[0].strip()
            question = row[1].strip()
            answer = row[2].strip()
            
            questions.append(f"{serial}. {question}")
            answers.append(f"{serial}. {answer}")
    
    return questions, answers

def process_qa_tables(questions: List[str], answers: List[str]) -> dict:
    """Process Q&A data into formatted tables."""
    questions_html = [f'<tr><td>{q}</td></tr>' for q in questions]
    
    total_answers = len(answers)
    if total_answers == 0:
        return {'questions': '\n'.join(questions_html), 'answers': []}
    
    answers_per_table = max(1, (total_answers + 2) // 3)
    answer_tables = []
    for i in range(0, total_answers, answers_per_table):
        table_answers = answers[i:i + answers_per_table]
        table_content = [f'<tr><td>{ans}</td></tr>' for ans in table_answers]
        range_start = i + 1
        range_end = min(i + answers_per_table, total_answers)
        answer_tables.append({
            'range': f'({range_start}-{range_end})',
            'content': '\n'.join(table_content)
        })
    
    return {'questions': '\n'.join(questions_html), 'answers': answer_tables}

async def generate_compilation(
    markdown_file: UploadFile,
    images_zip: UploadFile,
    custom_url: Optional[str] = None
):
    try:
        request_id = str(uuid.uuid4())
        request_dir = os.path.join(TEMP_DIR, request_id)
        os.makedirs(request_dir, exist_ok=True)

        md_path = os.path.join(request_dir, markdown_file.filename)
        with open(md_path, "wb") as f:
            shutil.copyfileobj(markdown_file.file, f)

        # Placeholder for ZIP processing (assumed unchanged)
        with open(md_path, "r", encoding="utf-8") as f:
            md_content = f.read()
        parsed_data = parse_markdown(md_content)

        # Placeholder for content_html generation (assumed unchanged)
        content_html = "..."  # Simplified for example

        # Load header/footer templates (assumed unchanged)
        html_dir = os.path.join('templates', 'brandings', 'weekly')
        with open(os.path.join(html_dir, 'wk-header-main.html'), 'r') as f:
            wk_header_main_html = env.from_string(f.read()).render()
        with open(os.path.join(html_dir, 'wk-header-constant.html'), 'r') as f:
            wk_header_constant_html = env.from_string(f.read()).render()
        with open(os.path.join(html_dir, 'wk-footer.html'), 'r') as f:
            wk_footer_html = env.from_string(f.read()).render()

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
            'qa_content': qa_content
        }

        main_template = env.get_template("compilationLayout.html")
        full_html = main_template.render(template_data)
        pdf_path = os.path.join(OUTPUT_DIR, f"{request_id}.pdf")
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        HTML(string=full_html, base_url=request_dir).write_pdf(pdf_path)

        return {
            "success": True,
            "message": "PDF generated successfully",
            "pdf_url": f"/api/download/{os.path.basename(pdf_path)}",
            "filename": os.path.basename(pdf_path)
        }

    except Exception as e:
        logger.error(f"Error during PDF generation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))