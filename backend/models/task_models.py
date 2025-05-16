from pydantic import BaseModel, Field
from typing import Optional, List, Any
from datetime import datetime

class ResearchRequest(BaseModel):
    topic: str = Field(..., min_length=3, description="The research topic for the agent.")

class TaskResponse(BaseModel):
    task_id: str
    status: str
    message: str

class TaskStatusResponse(BaseModel):
    task_id: str
    topic: str
    status: str
    created_at: datetime
    result: Optional[Any] = None
    error: Optional[str] = None
    completed_at: Optional[datetime] = None
    failed_at: Optional[datetime] = None

class TaskListItem(BaseModel):
    task_id: str
    topic: str
    status: str
    created_at: datetime
    completed_at: Optional[datetime] = None

class TaskList(BaseModel):
    tasks: List[TaskListItem]
    total: int