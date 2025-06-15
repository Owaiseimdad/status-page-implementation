from app.services.status_page_service import StatusPageService
from app.models.status_page_model import StatusPageCreate, StatusLogEntry

class StatusPageController:
    def __init__(self):
        self.service = StatusPageService()

    async def handle_create_status_page(self, data: StatusPageCreate):
        return await self.service.create_status_page(data)
    
    async def handle_get_all_status_pages(self, user_id: str):
        return await self.service.get_all_status_pages(user_id)
    
    async def handle_get_status_page_by_id(self, id: str):
        return await self.service.get_status_page_by_id(id)
    
    async def handle_add_log_entry(self, id: str, entry: StatusLogEntry):
        return await self.service.add_log_entry(id, entry)
    
    async def handle_delete_log_entry(self, page_id: str, entry_id: str):
        return await self.service.delete_log_entry(page_id, entry_id)
    
    async def handle_delete_status_page(self, id: str, user_id: str) -> bool:
        return await self.service.delete_status_page(id, user_id)
    
    async def handle_get_status_page_by_slug(self, slug: str):
        return await self.service.get_status_page_by_slug(slug)


