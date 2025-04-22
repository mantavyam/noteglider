import logging
import traceback
import os
import re
import shutil
import zipfile
import uuid
from fastapi import HTTPException
from weasyprint import HTML
from typing import List
from jinja2 import Environment, FileSystemLoader
from .newsletter import parse_markdown 

logger = logging.getLogger(__name__)
env = Environment(loader=FileSystemLoader("templates"))

async def generate_compilation_pdf(
    markdown_file,
    images_zip,
    youtube_entries: List = None
):
    try:
        request_id = str(uuid.uuid4())
        request_dir = os.path.join("temp", request_id)
        os.makedirs(request_dir, exist_ok=True)

        # Save markdown file
        md_path = os.path.join(request_dir, markdown_file.filename)
        with open(md_path, "wb") as f:
            shutil.copyfileobj(markdown_file.file, f)

        # Process images
        images_dir = os.path.join(request_dir, "images")
        os.makedirs(images_dir, exist_ok=True)
        zip_path = os.path.join(request_dir, images_zip.filename)
        
        with open(zip_path, "wb") as f:
            shutil.copyfileobj(images_zip.file, f)

        # Extract images
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(images_dir)

        # Parse markdown content
        with open(md_path, "r", encoding="utf-8") as f:
            md_content = f.read()
        parsed_data = parse_markdown(md_content)

        # Group YouTube entries by date
        if youtube_entries:
            grouped_videos = {}
            for entry in youtube_entries:
                date = entry.date
                if date not in grouped_videos:
                    grouped_videos[date] = []
                grouped_videos[date].append(entry.url)
            parsed_data['youtube_videos'] = grouped_videos

        # Copy static assets
        static_source = os.path.abspath('static')
        static_dest = os.path.join(request_dir, 'static')
        shutil.copytree(static_source, static_dest, dirs_exist_ok=True)

        # Render template
        template = env.get_template("compilationLayout.html")
        html_content = template.render({
            'content': parsed_data,
            'has_videos': bool(youtube_entries)
        })

        # Generate PDF filename using the first date from markdown content
        sanitized_date = parsed_data.get('date', 'NO-DATE').replace('/', '-').strip()
        pdf_filename = f"Weekly-Compilation-{sanitized_date}.pdf"
        pdf_path = os.path.join("output", pdf_filename)

        # Generate PDF
        HTML(string=html_content, base_url=request_dir).write_pdf(pdf_path)

        return {
            "success": True,
            "filename": pdf_filename,
            "size": os.path.getsize(pdf_path) / 1024  # Size in KB
        }

    except Exception as e:
        logger.error(f"Error generating compilation PDF: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))
