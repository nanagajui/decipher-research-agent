from fastapi import FastAPI, HTTPException, Query, Depends, status, APIRouter
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import logging
from datetime import datetime
from typing import Optional

from services import task_manager
from models import (
    ResearchRequest,
    TaskResponse,
    TaskStatusResponse,
    TaskListItem,
    TaskList
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create router for API endpoints
router = APIRouter(prefix="/api")

# API Endpoints
@router.post("/research",
          response_model=TaskResponse,
          status_code=status.HTTP_202_ACCEPTED,
          summary="Submit a new research task",
          description="Submits a topic for research. The task runs in the background.")
def submit_research_task(request: ResearchRequest):
    task_id = task_manager.submit_task(request.topic)
    return TaskResponse(
        task_id=task_id,
        status="queued",
        message="Research task submitted and will be processed."
    )

@router.get("/research/{task_id}",
         response_model=TaskStatusResponse,
         summary="Get research task status by ID",
         description="Retrieves the status and result (if available) of a specific research task.")
def get_task_details(task_id: str):
    task_info = task_manager.get_task_status(task_id)
    if not task_info:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found.")
    return TaskStatusResponse(**task_info, task_id=task_id)

@router.get("/tasks",
         response_model=TaskList,
         summary="List all research tasks",
         description="Retrieves a list of all submitted tasks, optionally filtered by status.")
def get_all_tasks(
    status_filter: Optional[str] = Query(None, alias="status", description="Filter tasks by status (e.g., queued, running, completed, failed)")
):
    all_tasks_details = task_manager.list_all_tasks(filter_status=status_filter)
    return TaskList(
        tasks=[TaskListItem(**task) for task in all_tasks_details],
        total=len(all_tasks_details)
    )

@router.delete("/research/{task_id}",
            status_code=status.HTTP_200_OK,
            summary="Cancel a research task",
            description="Attempts to cancel a queued task. Running tasks will be marked for cancellation but may complete.")
def cancel_single_task(task_id: str):
    if not task_manager.get_task_status(task_id):
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found.")

    success = task_manager.cancel_task(task_id)
    if success:
        task_info = task_manager.get_task_status(task_id)
        return {"task_id": task_id, "status": task_info.get("status"), "message": "Task cancellation processed."}
    else:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Task cannot be cancelled (e.g., already completed or failed).")

@router.get("/health", summary="API Health Check")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Create FastAPI app
app = FastAPI(
    title="Decipher Research Agent",
    description="API for running intelligent research agents in the background",
    version="0.1.0",
)

# Add CORS middleware (adjust origins for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Example: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router
app.include_router(router)