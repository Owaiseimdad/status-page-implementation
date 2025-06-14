from fastapi import APIRouter
from app.models.status_page_model import StatusPageCreate, StatusPageInDB, StatusLogEntry
from app.controller.status_page_controller import StatusPageController

class StatusPageRouter:
    def __init__(self):
        self.router = APIRouter()
        self._add_routes()

    def _add_routes(self):
        @self.router.post("/")
        async def create_status_page(data: StatusPageCreate):
            controller = StatusPageController()
            inserted_id = await controller.handle_create_status_page(data)
            return {"message": "Status page created", "id": inserted_id}
        
        @self.router.get("/")
        async def get_status_pages(user_id: str):
            controller = StatusPageController()
            pages = await controller.handle_get_all_status_pages(user_id)
            return {"data": pages}
        
        @self.router.get("/{id}", response_model=StatusPageInDB)
        async def get_status_page_by_id(id: str):
            controller = StatusPageController()
            page = await controller.handle_get_status_page_by_id(id)
            if not page:
                raise HTTPException(status_code=404, detail="Status page not found")
            return page
        
        @self.router.post("/{id}/add_log_entry")
        async def add_log_entry(id: str, entry: StatusLogEntry):
            controller = StatusPageController()
            success = await controller.handle_add_log_entry(id, entry)
            if not success:
                raise HTTPException(status_code=404, detail="Status page not found")
            return {"message": "Log entry added successfully"}
        
        @self.router.delete("/{id}/log/{entry_id}")
        async def delete_log_entry(id: str, entry_id: str):
            controller = StatusPageController()
            success = await controller.handle_delete_log_entry(id, entry_id)
            if not success:
                raise HTTPException(status_code=404, detail="Log entry not found")
            return {"message": "Log entry deleted successfully"}
        
        @self.router.delete("/{id}")
        async def delete_status_page(id: str, user_id: str):
            controller = StatusPageController()
            success = await controller.handle_delete_status_page(id, user_id)
            if not success:
                raise HTTPException(status_code=403, detail="Not authorized or page not found")
            return {"message": "Status page deleted successfully"}

        

router = StatusPageRouter().router
