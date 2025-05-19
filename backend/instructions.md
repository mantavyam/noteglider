## PROJECT OVERVIEW
- A SaaS web application that automates the creation of dynamically designed PDF newsletters by processing a Markdown document and associated image assets.
- INPUT = Markdown File + ZIP Image Assets Folder
- OUTPUT = PDF (Follows a Custom Design Theme which Dynamically Populates Data from INPUT)

## old-PROCESS
- User Input:
	- Selects Markdown File
	- Selects ZIP Image Assets File
	- Optionally Passes a Link to a Youtube Video
- Preview:
	- A Split Screen Scrollable Preview where:
		- Left Half - Markdown Preview
		- Right Half - Images
	- Actions: Build PDF / Abort / Restart
- Build PDF:
	- A PDF Preview of PDF built is show to the user.
	- Right Card Pane displays:
		- Name of PDF File
		- Buttons:
			- Hide PDF Preview 
			- Download PDF

## UI Tweaks Performed on Frontend:
	- LANDING PAGE -> DASHBOARD -> BUILD PAGE
	- DASHBOARD:
		- ROUTE:
			- ROUTE 1: NEWSLETTER (Daily)
				- DESCRIPTION(R1): Same Workflow as Current
			- ROUTE 2: COMPILATION (Weekly)
				- DESCRIPTION(R2): Integration of New Workflow for Weekly PDF Layouts:
					- INPUTS (Same as Route 1: Markdown File and ZIP File)
					- OUTPUT: Unique to Weekly-Layout (New-Style)
			- ROUTE 3: MAGAZINE (Monthly)
				- DESCRIPTION(R3): Integration of Sub-Routes for Various Types of PDF Layouts in Monthly Magazine (As Monthly PDF has Different Layouts in Different Chapters):
				- A Sub-Dashboard which features multiple sub-routes in the same manner as we presented routes on the main dashboard page which takes user to separate layout generation capabilities.
				- A Monthly Magazine follows multiple layouts hence we will club them together and present sub-routes to user where each route has a separate layout of it's own and after the user input of .md file and .zip file the respective layout will output it's PDF.
				- Here is the List of Sub-Routes in Alphabetical Order:
				- MAIN:
						Appointments & Resignation
						Awards & Recognition
						Banking & Insurance
						Books & Authors
						Brand Ambassadors
						Defence News
						Festivals
						GDP Forecast
						Important Days
						International News
						MOU's & Partnership
						National News
						Obituaries
						RBI & SEBI Corner
						Reports & Indices
						Science & Technology
						Sports
						State / UT News
						Visits, Meetings & Summits
				- EXTRAS:
						Current Affairs Cracker SHOTS
						Static Awareness
						Current Affairs MCQs
		- HISTORY:
			- TABLE (To Display Past PDF Generated Data from Local Caching no Database Integration)
				- TABLE COLUMNS:
					- FILE-TYPE: NEWSLETTER/COMPILATION/MAGAZINE
					- FILE-NAME: NAME
					- FILE-SIZE: SIZE
					- FILE-PAGES: OUTPUT PDF PAGE COUNT

## Old Project Directory
```
├── README.md
├── backend
│   ├── README.md
│   ├── main.py
│   ├── requirements.txt
│   └── templates
│       ├── brandings
│       │   ├── Footer.html
│       │   ├── Header-Constant.html
│       │   └── Header-Main.html
│       └── newsletterLayout.html
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── hooks
│   ├── index.css
│   ├── lib
│   ├── main.tsx
│   ├── pages
│   │   ├── BuildPage.tsx
│   │   ├── DownloadPage.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   └── TaskPage.tsx
│   ├── services
│   └── vite-env.d.ts
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
## Current Project Directory

```
├── README.md
├── backend
│   ├── README.md
│   ├── main.py
│   ├── requirements.txt
│   └── templates
│       ├── brandings
│       │   ├── Footer.html
│       │   ├── Header-Constant.html
│       │   └── Header-Main.html
│       ├── compilationLayout.html
│       ├── magazineLayouts
│       │   ├── appointLayout.html
│       │   ├── awardLayout.html
│       │   ├── bankingLayout.html
│       │   ├── booksLayout.html
│       │   ├── brandLayout.html
│       │   ├── defenceExerciseLayout.html
│       │   ├── defenceNewsLayout.html
│       │   ├── festivalsLayout.html
│       │   ├── gdpLayout.html
│       │   ├── impDaysLayout.html
│       │   ├── internationalLayout.html
│       │   ├── mouLayout.html
│       │   ├── nationalLayout.html
│       │   ├── obituaryLayout.html
│       │   ├── rbiCornerLayout.html
│       │   ├── reportsLayout.html
│       │   ├── scienceLayout.html
│       │   ├── sportsLayout.html
│       │   ├── stateLayout.html
│       │   └── visitsLayout.html
│       │   ├── Xtras
│       │   │   ├── 100McqLayout.html
│       │   │   ├── crackerTabular.html
│       │   │   └── staticAwareness.html
│       └── newsletterLayout.html
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── hooks
│   ├── index.css
│   ├── lib
│   ├── main.tsx
│   ├── pages
│   │   ├── BuildPage.tsx
│   │   ├── CompilationPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── DownloadPage.tsx
│   │   ├── Index.tsx
│   │   ├── MagazinePage.tsx
│   │   ├── NotFound.tsx
│   │   └── TaskPage.tsx
│   ├── services
│   └── vite-env.d.ts
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
## Definitive Guide to Update the Backend for Multiple PDF Layouts

To address the updated requirements of the SaaS web application, we need to modify the backend to support multiple types of PDF layouts—daily newsletters, weekly compilations, and monthly magazines with various subtypes—based on the revamped frontend structure. Below is a high-level ideation and detailed logic to update the backend, specifically the `main.py` file, to handle these new capabilities efficiently while maintaining a clean and modular codebase.

### High-Level Ideation

The original backend was designed to generate a single type of PDF layout (newsletter) using the `newsletterLayout.html` template. With the frontend now featuring a dashboard with three main routes—**NEWSLETTER (Daily)**, **COMPILATION (Weekly)**, and **MAGAZINE (Monthly)**—and the MAGAZINE route including multiple sub-routes for different layouts, the backend must be extended to:

1. **Support Multiple Endpoints**: Define distinct API endpoints for each PDF type to align with the frontend routes, ensuring clear separation of concerns and ease of maintenance.
2. **Handle Diverse Templates**: Utilize the new template files (`compilationLayout.html`, various files in `magazineLayouts/`, and `Xtras/`) to generate PDFs specific to each layout type.
3. **Centralize Processing Logic**: Implement a reusable processing function to handle common tasks (e.g., file uploads, Markdown conversion, PDF generation) across all layout types, minimizing code duplication.
4. **Map Magazine Subtypes**: Create a mapping mechanism for the magazine sub-routes to their corresponding template files, accommodating both main and extra layouts.
5. **Maintain Input Consistency**: Ensure all endpoints accept the same inputs (Markdown file, ZIP file, optional YouTube link) and produce a PDF output tailored to the selected layout.

The updated backend will leverage the existing tech stack (FastAPI, WeasyPrint, Jinja2, etc.) to achieve these goals, ensuring compatibility with the frontend’s REST API communication via FormData.

---

### Detailed Logic and Implementation

Here’s a step-by-step guide to update the backend:

#### 1. Define API Endpoints
Create three distinct endpoints in `main.py` to match the frontend’s dashboard routes:
- **`/api/generate/newsletter`**: For generating daily newsletter PDFs.
- **`/api/generate/compilation`**: For generating weekly compilation PDFs.
- **`/api/generate/magazine/{subtype}`**: For generating monthly magazine PDFs, with a path parameter `subtype` to specify the layout (e.g., "appointments", "xtras_mcqs").

This approach provides a clear API structure that mirrors the frontend navigation, making it intuitive for the frontend to call the appropriate endpoint based on user selection.

#### 2. Map Magazine Subtypes to Templates
Since the MAGAZINE route includes multiple sub-routes (e.g., "Appointments & Resignation", "Current Affairs MCQs"), we need a mapping between the subtype identifiers (used in the API URL) and their corresponding template files in the `templates/magazineLayouts/` directory. Define a dictionary in `main.py`:

```python
MAGAZINE_TEMPLATES = {
    "appointments": "magazineLayouts/appointLayout.html",
    "awards": "magazineLayouts/awardLayout.html",
    "banking": "magazineLayouts/bankingLayout.html",
    "books": "magazineLayouts/booksLayout.html",
    "brand": "magazineLayouts/brandLayout.html",
    "defence_exercise": "magazineLayouts/defenceExerciseLayout.html",
    "defence_news": "magazineLayouts/defenceNewsLayout.html",
    "festivals": "magazineLayouts/festivalsLayout.html",
    "gdp": "magazineLayouts/gdpLayout.html",
    "imp_days": "magazineLayouts/impDaysLayout.html",
    "international": "magazineLayouts/internationalLayout.html",
    "mou": "magazineLayouts/mouLayout.html",
    "national": "magazineLayouts/nationalLayout.html",
    "obituary": "magazineLayouts/obituaryLayout.html",
    "rbi_corner": "magazineLayouts/rbiCornerLayout.html",
    "reports": "magazineLayouts/reportsLayout.html",
    "science": "magazineLayouts/scienceLayout.html",
    "sports": "magazineLayouts/sportsLayout.html",
    "state": "magazineLayouts/stateLayout.html",
    "visits": "magazineLayouts/visitsLayout.html",
    "xtras_mcqs": "magazineLayouts/Xtras/100McqLayout.html",
    "xtras_cracker": "magazineLayouts/Xtras/crackerTabular.html",
    "xtras_static": "magazineLayouts/Xtras/staticAwareness.html",
}
```

**Note**: The subtype keys (e.g., "appointments", "xtras_mcqs") must be coordinated with the frontend to ensure they match the values sent in API requests. These keys are simplified and normalized versions of the sub-route names (e.g., "Appointments & Resignation" → "appointments").

#### 3. Implement a Common Processing Function
To avoid duplicating code across endpoints, create a centralized function `process_and_generate_pdf` that handles the common logic for processing inputs and generating PDFs. This function will:
- Accept the template path and input files as parameters.
- Process the Markdown file, extract images, handle the YouTube link (if provided), and render the PDF using the specified template.

#### 4. Update `main.py` with the New Structure
Below is the complete updated code for `main.py`:

```python
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from typing import Optional
import os
import shutil
import zipfile
import markdown
from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader
import tempfile

app = FastAPI()

# Magazine subtype to template mapping
MAGAZINE_TEMPLATES = {
    "appointments": "magazineLayouts/appointLayout.html",
    "awards": "magazineLayouts/awardLayout.html",
    "banking": "magazineLayouts/bankingLayout.html",
    "books": "magazineLayouts/booksLayout.html",
    "brand": "magazineLayouts/brandLayout.html",
    "defence_exercise": "magazineLayouts/defenceExerciseLayout.html",
    "defence_news": "magazineLayouts/defenceNewsLayout.html",
    "festivals": "magazineLayouts/festivalsLayout.html",
    "gdp": "magazineLayouts/gdpLayout.html",
    "imp_days": "magazineLayouts/impDaysLayout.html",
    "international": "magazineLayouts/internationalLayout.html",
    "mou": "magazineLayouts/mouLayout.html",
    "national": "magazineLayouts/nationalLayout.html",
    "obituary": "magazineLayouts/obituaryLayout.html",
    "rbi_corner": "magazineLayouts/rbiCornerLayout.html",
    "reports": "magazineLayouts/reportsLayout.html",
    "science": "magazineLayouts/scienceLayout.html",
    "sports": "magazineLayouts/sportsLayout.html",
    "state": "magazineLayouts/stateLayout.html",
    "visits": "magazineLayouts/visitsLayout.html",
    "xtras_mcqs": "magazineLayouts/Xtras/100McqLayout.html",
    "xtras_cracker": "magazineLayouts/Xtras/crackerTabular.html",
    "xtras_static": "magazineLayouts/Xtras/staticAwareness.html",
}

def process_and_generate_pdf(template_path: str, markdown_file: UploadFile, images_file: UploadFile, youtube_link: Optional[str] = None) -> str:
    """
    Process inputs and generate a PDF using the specified template.
    
    Args:
        template_path (str): Path to the HTML template file.
        markdown_file (UploadFile): Uploaded Markdown file.
        images_file (UploadFile): Uploaded ZIP file with image assets.
        youtube_link (Optional[str]): Optional YouTube video URL.
    
    Returns:
        str: Path to the generated PDF file.
    """
    with tempfile.TemporaryDirectory() as temp_dir:
        # Save uploaded files to temporary directory
        md_path = os.path.join(temp_dir, markdown_file.filename)
        with open(md_path, "wb") as f:
            shutil.copyfileobj(markdown_file.file, f)
        
        zip_path = os.path.join(temp_dir, images_file.filename)
        with open(zip_path, "wb") as f:
            shutil.copyfileobj(images_file.file, f)
        
        # Extract ZIP file
        extract_path = os.path.join(temp_dir, "images")
        os.makedirs(extract_path, exist_ok=True)
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_path)
        
        # Convert Markdown to HTML
        with open(md_path, "r", encoding="utf-8") as f:
            md_content = f.read()
        html_content = markdown.markdown(md_content)
        
        # Process optional YouTube link
        youtube_data = None
        if youtube_link:
            try:
                video_id = youtube_link.split("v=")[1].split("&")[0]
                youtube_data = {
                    "url": youtube_link,
                }
            except IndexError:
                youtube_data = {"url": youtube_link}
        
        # Render the template with Jinja2
        env = Environment(loader=FileSystemLoader("templates"))
        try:
            template = env.get_template(template_path)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Template error: {str(e)}")
        
        rendered_html = template.render(content=html_content, youtube_data=youtube_data)
        
        # Generate PDF with WeasyPrint
        pdf_path = os.path.join(temp_dir, "output.pdf")
        HTML(string=rendered_html).write_pdf(pdf_path)
        
        return pdf_path

# Endpoint for Newsletter (Daily)
@app.post("/api/generate/newsletter")
async def generate_newsletter(
    markdown: UploadFile = File(...),
    images: UploadFile = File(...),
    youtube_link: Optional[str] = None
):
    template = "newsletterLayout.html"
    pdf_path = process_and_generate_pdf(template, markdown, images, youtube_link)
    return FileResponse(pdf_path, media_type="application/pdf", filename="newsletter.pdf")

# Endpoint for Compilation (Weekly)
@app.post("/api/generate/compilation")
async def generate_compilation(
    markdown: UploadFile = File(...),
    images: UploadFile = File(...),
    youtube_link: Optional[str] = None
):
    template = "compilationLayout.html"
    pdf_path = process_and_generate_pdf(template, markdown, images, youtube_link)
    return FileResponse(pdf_path, media_type="application/pdf", filename="compilation.pdf")

# Endpoint for Magazine (Monthly) with Subtypes
@app.post("/api/generate/magazine/{subtype}")
async def generate_magazine(
    subtype: str,
    markdown: UploadFile = File(...),
    images: UploadFile = File(...),
    youtube_link: Optional[str] = None
):
    template = MAGAZINE_TEMPLATES.get(subtype)
    if not template:
        raise HTTPException(status_code=400, detail="Invalid magazine subtype")
    pdf_path = process_and_generate_pdf(template, markdown, images, youtube_link)
    return FileResponse(pdf_path, media_type="application/pdf", filename=f"magazine_{subtype}.pdf")
```

#### 5. Key Components Explained
- **Imports**: Ensure all necessary libraries are installed (`fastapi`, `weasyprint`, `jinja2`, `markdown`, `python-multipart`) via `requirements.txt`.
- **Processing Function**:
  - **File Handling**: Uses `tempfile` to manage temporary files securely.
  - **Markdown Conversion**: Converts the Markdown content to HTML using the `markdown` library.
  - **YouTube Processing**: if a YouTube link is provided, passing it to the template for optional use.
  - **Template Rendering**: Uses Jinja2 to render the HTML template with the processed content and YouTube data.
  - **PDF Generation**: Converts the rendered HTML to a PDF using WeasyPrint.
- **Endpoints**:
  - Each endpoint specifies its template and calls the common processing function.
  - Returns the PDF as a `FileResponse` with a descriptive filename.

#### 6. Template Assumptions
- All templates (`newsletterLayout.html`, `compilationLayout.html`, and those in `magazineLayouts/`) must accept a `content` variable (the processed HTML from Markdown) and an optional `youtube_data` variable (a dictionary with `url`).
- Templates should include necessary branding (e.g., via `templates/brandings/`) and styling to differentiate layouts.

#### 7. Coordination with Frontend
- Ensure the frontend sends requests to the correct endpoints:
  - `/api/generate/newsletter` for NEWSLETTER route.
  - `/api/generate/compilation` for COMPILATION route.
  - `/api/generate/magazine/{subtype}` for MAGAZINE sub-routes, with `subtype` matching keys in `MAGAZINE_TEMPLATES`.
- The preview functionality (split-screen Markdown and images) remains a frontend responsibility, unaffected by backend changes.

---

### Additional Considerations
- **Error Handling**: The code includes basic error handling (e.g., invalid subtypes, template errors). Enhance as needed with logging or more detailed messages.
- **Scalability**: If new layouts are added, update `MAGAZINE_TEMPLATES` or consider a dynamic template discovery mechanism.
- **YouTube Flexibility**: The current YouTube processing is minimal; extend it (e.g., fetch titles or embeds) if specific layouts require more data.
- **Performance**: For large files, consider asynchronous processing or streaming responses, though the current setup suffices for typical use cases.

---

### Conclusion
This guide updates the backend to support the new frontend structure by introducing separate endpoints for each PDF type, a centralized processing function, and a template mapping for magazine subtypes. The solution leverages the existing tech stack, ensures maintainability, and aligns with the revamped UI’s workflow, enabling the generation of diverse PDF layouts from the same input types.