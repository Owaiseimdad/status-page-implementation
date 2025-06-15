from app.db.mongo import get_db
from app.models.status_page_model import StatusPageCreate, StatusPageInDB, StatusLogEntry
from bson import ObjectId

class StatusPageService:
    async def create_status_page(self, data: StatusPageCreate):
        db = get_db() 
        document = data.dict()
        document["entries"] = [] 
        result = await db["status_pages"].insert_one(data.dict())
        return str(result.inserted_id)
    
    async def get_all_status_pages(self, user_id: str) -> list[StatusPageInDB]:
        db = get_db()
        cursor = db["status_pages"].find({"user_id": user_id})
        results = []
        async for doc in cursor:
            doc["id"] = str(doc["_id"])
            del doc["_id"]
            results.append(StatusPageInDB(**doc))
        return results
    
    async def get_status_page_by_id(self, id: str) -> StatusPageInDB:
        db = get_db()
        doc = await db["status_pages"].find_one({"_id": ObjectId(id)})
        if not doc:
            return None
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        return StatusPageInDB(**doc)
    
    async def add_log_entry(self, page_id: str, entry: StatusLogEntry):
        db = get_db()
        result = await db["status_pages"].update_one(
            {"_id": ObjectId(page_id)},
            {"$push": {"entries": entry.dict()}}
        )
        return result.modified_count > 0
    
    async def delete_log_entry(self, page_id: str, entry_id: str):
        db = get_db()
        result = await db["status_pages"].update_one(
            {"_id": ObjectId(page_id)},
            {"$pull": {"entries": {"id": entry_id}}}
        )
        return result.modified_count > 0
    
    async def delete_status_page(self, page_id: str, user_id: str) -> bool:
        db = get_db()
        page = await db["status_pages"].find_one({"_id": ObjectId(page_id)})

        if not page:
            return False

        if page.get("user_id") != user_id:
            return False

        result = await db["status_pages"].delete_one({"_id": ObjectId(page_id)})
        return result.deleted_count > 0
    
    async def get_status_page_by_slug(self, slug: str):
        db = get_db()
        doc = await db["status_pages"].find_one({"slug": slug})
        if not doc:
            return None
        print("All doc values:", doc)
        return doc

