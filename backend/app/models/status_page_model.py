from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import datetime
from uuid import uuid4

class StatusLogEntry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()), description="Unique ID for this log entry")
    type: Literal["log", "incident"]
    message: str
    user_id: str = Field(..., description="Clerk user ID of the person who added the log/incident")
    email: str = Field(..., description="Email of the user who added the entry")
    timestamp: datetime = Field(default_factory=datetime.now, description="Time when the entry was created")

class StatusPageCreate(BaseModel):
    name: str
    user_id: str
    slug: str
    description: Optional[str] = ""
    domain: Optional[str] = ""
    timezone: str = "UTC"

class StatusPageInDB(StatusPageCreate):
    id: str
    entries: List[StatusLogEntry] = []
