from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class PublicStatusLogEntry(BaseModel):
    id: Optional[str] = None
    type: str
    message: str
    timestamp: datetime

class PublicStatusPage(BaseModel):
    id: str
    name: str
    slug: str
    description: Optional[str] = ""
    domain: Optional[str] = ""
    timezone: str
    entries: List[PublicStatusLogEntry] = []
