<p align="center">
  <img src="https://img.shields.io/github/license/your-org/status-page-app" />
  <img src="https://img.shields.io/github/repo-size/your-org/status-page-app" />
  <img src="https://img.shields.io/github/commit-activity/m/your-org/status-page-app" />
  <img src="https://img.shields.io/github/last-commit/your-org/status-page-app" />
  <img src="https://img.shields.io/github/languages/top/your-org/status-page-app" />
  <img src="https://img.shields.io/github/issues/your-org/status-page-app" />
  <img src="https://img.shields.io/github/issues-pr/your-org/status-page-app" />
</p>

<h1 align="center"><strong>Status Page App</strong></h1>

<p align="center">A full-stack app to create public status pages, manage logs/incidents, and monitor system updates. Built using React, FastAPI, and MongoDB.</p>

---

## 🚀 Quickstart Guide

This repo contains both the **frontend** and **backend** apps. Follow the steps below to get everything running locally.

---

### 🐳 1. Start MongoDB via Docker

```bash
docker run -d \
  --name status-mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  mongo
```


### 🐳 2. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a .env file inside the backend/ folder:

MONGO_URL=mongodb://mongoadmin:secret@localhost:27017
Then run the backend server:

```bash
uvicorn main:app --reload
```

### 💻 3. Frontend Setup (Vite + React + MUI + Clerk)

```bash
cd frontend
npm install
```

Create a .env file inside the frontend/ folder:

VITE_APP_API_BASE_URL=http://localhost:8000/api/v1
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key


Replace your-clerk-publishable-key with the one from your Clerk.dev dashboard.

Now run the development server:

```bash
npm run dev
```