import logging
import os
from processing.newsletter import generate_newsletter_pdf
from processing.compilation import generate_compilation
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from weasyprint import HTML
from typing import Optional, List
from jinja2 import Environment, FileSystemLoader
from bs4 import BeautifulSoup
from pydantic import BaseModel
import json
from datetime import datetime
import mimetypes
import magic  # pip install python-magic

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Define directories
TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)
OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Set up Jinja2 environment
env = Environment(loader=FileSystemLoader("templates"))
env.globals['zip'] = zip

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

class YouTubeEntry(BaseModel):
    url: str
    date: str

def validate_markdown_file(file: UploadFile) -> bool:
    content = file.file.read()
    file.file.seek(0)  # Reset file pointer
    if not content:
        return False
    mime = magic.Magic(mime=True)
    mime_type = mime.from_buffer(content)
    return mime_type.startswith('text/')

def validate_zip_file(file: UploadFile) -> bool:
    content = file.file.read(4)
    file.file.seek(0)  # Reset file pointer
    return content.startswith(b'PK\x03\x04')

@app.post("/api/generate-pdf")
async def generate_pdf(
    markdown_file: UploadFile = File(...),
    images_zip: UploadFile = File(...),
    custom_url: Optional[str] = Form(None)
):
    try:
        return await generate_newsletter_pdf(
            markdown_file=markdown_file,
            images_zip=images_zip,
            custom_url=custom_url
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-compilation")
async def generate_compilation_endpoint(
    markdown_file: UploadFile = File(...),
    images_zip: UploadFile = File(...),
    youtube_data: Optional[str] = Form(None),
    custom_url: Optional[str] = Form(None)
):
    try:
        # Validate files
        if not markdown_file.filename.endswith('.md'):
            raise HTTPException(
                status_code=400,
                detail="Markdown file must have .md extension"
            )

        if not validate_markdown_file(markdown_file):
            raise HTTPException(
                status_code=400,
                detail="Invalid or empty Markdown file"
            )

        if not images_zip.filename.endswith('.zip'):
            raise HTTPException(
                status_code=400,
                detail="Images file must have .zip extension"
            )

        if not validate_zip_file(images_zip):
            raise HTTPException(
                status_code=400,
                detail="Invalid ZIP file format"
            )

        result = await generate_compilation(
            markdown_file=markdown_file,
            images_zip=images_zip,
            custom_url=custom_url
        )

        return {
            "success": True,
            "message": "Compilation generated successfully",
            "pdf_url": f"/api/download/{result['filename']}",
            "filename": result['filename'],
            "size": result['size']
        }

    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error("Error in generate_compilation_endpoint", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/download/{filename}")
async def download_pdf(filename: str):
    file_path = os.path.join(OUTPUT_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename=filename,
        headers={"Content-Disposition": "inline; filename=Newsletter-Daily.pdf"}
    )

@app.get("/api/download/compilation/{filename}")
async def download_compilation(filename: str):
    file_path = os.path.join(OUTPUT_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Compilation file not found")
    
    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename=filename,
        headers={"Content-Disposition": "inline; filename=Compilation-Weekly.pdf"}
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