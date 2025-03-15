
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import os
import shutil
import zipfile
import tempfile
import markdown
import uuid
from weasyprint import HTML, CSS
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Newsletter Generator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create temp directories
TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)
OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

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
        
        # Extract the zip file
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(images_dir)
        
        # Read markdown content
        with open(md_path, "r", encoding="utf-8") as f:
            md_content = f.read()
        
        # Convert markdown to HTML
        html_content = markdown.markdown(md_content)
        
        # Apply CSS styling and add image references
        styled_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Newsletter</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                h1, h2, h3 {{
                    color: #333;
                }}
                img {{
                    max-width: 100%;
                    height: auto;
                }}
                a {{
                    color: #0066cc;
                    text-decoration: none;
                }}
                .footer {{
                    margin-top: 30px;
                    padding-top: 10px;
                    border-top: 1px solid #eee;
                    font-size: 0.8em;
                    color: #666;
                }}
            </style>
        </head>
        <body>
            {html_content}
            <div class="footer">
                <p>Generated newsletter - {custom_url or "https://www.youtube.com/@default/streams"}</p>
            </div>
        </body>
        </html>
        """
        
        # Create a temp HTML file
        html_path = os.path.join(request_dir, "newsletter.html")
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(styled_html)
        
        # Generate PDF using WeasyPrint
        pdf_filename = f"newsletter_{request_id}.pdf"
        pdf_path = os.path.join(OUTPUT_DIR, pdf_filename)
        
        HTML(string=styled_html).write_pdf(pdf_path)
        
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
        filename="newsletter.pdf"
    )

@app.get("/api/status")
async def get_status():
    return {"status": "online", "message": "Backend service is running"}

# Clean up function to remove temporary files
@app.on_event("startup")
async def startup_event():
    print("Newsletter API started")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
