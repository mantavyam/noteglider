import logging
import os
from processing.newsletter import generate_newsletter_pdf
from processing.compilation import generate_compilation_pdf
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from weasyprint import HTML
from typing import Optional, List
from jinja2 import Environment, FileSystemLoader
from bs4 import BeautifulSoup
from pydantic import BaseModel
import json

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
async def generate_compilation(
    markdown_file: UploadFile = File(...),
    images_zip: UploadFile = File(...),
    youtube_data: str = Form(None),
    custom_url: Optional[str] = Form(None)
):
    try:
        # Parse YouTube data if provided
        youtube_entries = []
        if youtube_data:
            try:
                data = json.loads(youtube_data)
                # Filter out entries with empty URLs
                youtube_entries = [
                    YouTubeEntry(url=entry['url'], date=entry['date'])
                    for entry in data
                    if entry.get('url') and entry.get('date')
                ]
            except json.JSONDecodeError:
                logger.error("Failed to parse youtube_data JSON")
                raise HTTPException(status_code=400, detail="Invalid YouTube data format")

        result = await generate_compilation_pdf(
            markdown_file=markdown_file,
            images_zip=images_zip,
            youtube_entries=youtube_entries,
            custom_url=custom_url
        )

        return {
            "success": True,
            "message": "Compilation PDF generated successfully",
            "pdf_url": f"/api/download/compilation/{result['filename']}",
            "filename": result['filename'],
            "size": result['size']
        }
    except Exception as e:
        logger.error(f"Error generating compilation: {str(e)}")
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