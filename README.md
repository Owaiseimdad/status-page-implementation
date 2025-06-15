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

```bash
MONGO_URL=mongodb://mongoadmin:secret@localhost:27017
```
Then run the backend server:

```bash
uvicorn main:app --reload
```

Backend Architecture:
<img width="1146" alt="Screenshot 2025-06-15 at 1 34 19 PM" src="https://github.com/user-attachments/assets/3c54c0a7-c213-47b9-b79d-19f284647c3f" />


### 💻 3. Frontend Setup (Vite + React + MUI + Clerk)

```bash
cd frontend
npm install
```

Create a .env file inside the frontend/ folder:

```bash
VITE_APP_API_BASE_URL=http://localhost:8000/api/v1
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
```


Replace your-clerk-publishable-key with the one from your Clerk.dev dashboard.

Now run the development server:

```bash
npm run dev
```
<img width="1431" alt="Screenshot 2025-06-15 at 1 44 47 PM" src="https://github.com/user-attachments/assets/3dd09d16-a446-47e1-967c-bf9e66944574" />

<img width="1436" alt="Screenshot 2025-06-15 at 1 44 55 PM" src="https://github.com/user-attachments/assets/47617c83-c256-4cd5-a0e1-77a69ee0c995" />

<img width="1395" alt="Screenshot 2025-06-15 at 1 45 05 PM" src="https://github.com/user-attachments/assets/e1d4bd5a-35b8-45c2-a504-a5dcda1faf91" />

Frontend Features:

🔐 Authentication (Clerk)

🧾 Create and manage status pages

🛠 Add logs and incidents to each page

🔗 Public status page view via unique slug

🎨 Built using MUI for UI consistency

🌐 Axios-based NetworkService for all API calls
