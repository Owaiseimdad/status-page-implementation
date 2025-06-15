from fastapi import APIRouter, HTTPException
from app.controller.status_page_controller import StatusPageController
from app.models.public_status_page_model import PublicStatusPage
from app.utils.clearners import clean_for_public

class PublicStatusPageRouter:
    def __init__(self):
        self.router = APIRouter()
        self._add_routes()

    def _add_routes(self):
        @self.router.get("/{slug}", response_model=PublicStatusPage)
        async def get_status_page_by_slug(slug: str):
            controller = StatusPageController()
            page = await controller.handle_get_status_page_by_slug(slug)
            if not page:
                raise HTTPException(status_code=404, detail="Status page not found")
            return clean_for_public(page)

router = PublicStatusPageRouter().router
