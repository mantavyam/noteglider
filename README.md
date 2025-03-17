# Welcome to NoteGliders

## Project info

**About**
A SaaS web application that automates the creation of dynamically designed PDF newsletters by processing a Markdown document and associated image assets.
![Noteglider Logo](public/noteglider-logo.png)
![Noteglider Description](public/og-image.png)
![Noteglider Examples](public/landing-assets/landing-1.png)

## How can I edit this code?

If you want to work locally using your own IDE, you can clone this repo and push changes. 

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev

# Step 5: Start the Backend Service in separate terminal.
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## What technologies are used for this project?

This project is built with .

**Frontend**
- Vite: For fast development and optimized builds
- React: Core UI library
- TypeScript: For type safety
- React Router: For client-side routing
- TanStack Query: For server state management and data fetching
- Axios: For API requests to the backend
- shadcn-ui: Component library built on Radix UI
- Tailwind CSS: For utility-first styling
- Framer Motion: For animations
- JSZip: For handling ZIP files

**Backend**
- Python: Main backend language
- FastAPI: Web framework for building APIs
- Uvicorn: ASGI server to run FastAPI
- WeasyPrint: For generating PDFs from HTML/CSS
- python-multipart: For handling file uploads
- Markdown: For converting Markdown to HTML
- python-dotenv: For environment variable management
- Pydantic: For data validation

**Communication**
- REST API: For communication between frontend and backend
- FormData: For sending files from frontend to backend