# Experimental playground - Python backend, React frontend
- **Backend:** Python + FastAPI for basic audio processing
- **Frontend:** React + Vite (TypeScript) for UI and file upload

The app lets you upload an audio file, send it to the backend for processing (e.g. gain change), and play back the processed result in the browser.

---

## Prerequisites

Make sure you have:

- **Python** ≥ 3.10  
- **Node.js** ≥ 20 (Vite 8+ requirement)  
- **npm** (comes with Node.js)  
- **git** (optional, but recommended)

---

## Project structure

Organize your project:

```text
root/
  backend/    # FastAPI backend
  frontend/   # React + Vite frontend
```
---

## Create backend
Navigation from root/
### Create and activate venv
```
cd backend
python -m venv venv
source venv/bin/activate
```

### Install dependencies
```text
pip install fastapi uvicorn[standard] soundfile numpy
```
### Create main.py
- still inside ./backend/
```text
touch main.py
```
- insert contents of main.py
- this is going to be the main function of the backend

---

## Create frontend
Navigation from root/
```text
cd frontend
npm create vite@latest . -- --template react-ts
npm install
```

### App.tsx
- This is going to be the main frontend
- Paste the content into this file

---

## Shortcut to run front and backend together
Navigation from root/
```text
npm install concurrently --save-dev
touch package.json
```
- Put following into the `package.json`
```text
{
  "scripts": {
    "frontend": "cd frontend && npm run dev",
    "backend": "cd backend && uvicorn main:app --reload --port 8000",
    "dev": "concurrently \"npm run backend\" \"npm run frontend\""
  }
}
```
- run entire app from root/ via `npm run dev`

