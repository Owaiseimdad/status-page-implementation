# app/db/mongo.py
import motor.motor_asyncio
from os import getenv
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = getenv("MONGO_URI")
MONGO_DB_NAME = getenv("MONGO_DB_NAME")


class MongoDB:
    def __init__(self):
        self.client = None
        self.db = None

    async def connect(self):
        self.client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
        self.db = self.client[MONGO_DB_NAME]
        print("✅ MongoDB connected.")

    def get_db(self):
        if self.db is None:
            raise Exception("DB not connected")
        return self.db


# global instance
mongo_instance = MongoDB()

# helper to use in other files
def get_db():
    return mongo_instance.get_db()
