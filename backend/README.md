
# Newsletter Generator Backend

This is a FastAPI backend service that generates PDF newsletters from Markdown and image files using WeasyPrint.

## Setup

1. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install the dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the server:
   ```
   python main.py
   ```
   or for backend in reload mode
   ```
   uvicorn main:app --reload --reload-dir=templates --host 0.0.0.0 --port 8000
   ```

The API will be available at http://localhost:8000

## API Endpoints

- `POST /api/generate-pdf`: Generate a PDF from Markdown and images
- `GET /api/download/{filename}`: Download a generated PDF
- `GET /api/status`: Check if the backend is running

## Frontend Integration

Make sure the frontend is configured to communicate with these endpoints.
