# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.status_page import router as status_page_router
from app.db.mongo import mongo_instance

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db():
    await mongo_instance.connect()

app.include_router(status_page_router, prefix="/api/v1/status-page", tags=["Status Page"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
