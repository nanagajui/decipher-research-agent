from fastapi import FastAPI, HTTPException, Query, Depends, status, APIRouter
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from datetime import datetime
from typing import Optional
from contextlib import asynccontextmanager

from services import task_manager, initialize_db_pool, close_db_pool
from models import (
    ResearchRequest,
    TaskResponse,
    TaskStatusResponse,
    TaskListItem,
    TaskList
)

# Create router for API endpoints
router = APIRouter(prefix="/api")

# API Endpoints
@router.post("/research",
          response_model=TaskResponse,
          status_code=status.HTTP_202_ACCEPTED,
          summary="Submit a new research task",
          description="Submits a topic for research. The task runs in the background.")
def submit_research_task(request: ResearchRequest):
    logger.info(f"Submitting research task for notebook: {request.notebook_id}" +
               (f" on topic: {request.topic}" if request.topic else ""))
    task_id = task_manager.submit_task(
        notebook_id=request.notebook_id,
        topic=request.topic,
        sources=request.sources
    )
    logger.debug(f"Research task submitted with ID: {task_id}")
    return TaskResponse(
        task_id=task_id,
        notebook_id=request.notebook_id,
        status="queued",
        message="Research task submitted and will be processed."
    )

@router.get("/research/{task_id}",
         response_model=TaskStatusResponse,
         summary="Get research task status by ID",
         description="Retrieves the status and result (if available) of a specific research task.")
def get_task_details(task_id: str):
    logger.debug(f"Getting details for task ID: {task_id}")
    task_info = task_manager.get_task_status(task_id)
    if not task_info:
        logger.warning(f"Task not found: {task_id}")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found.")
    return TaskStatusResponse(**task_info, task_id=task_id)

@router.get("/tasks",
         response_model=TaskList,
         summary="List all research tasks",
         description="Retrieves a list of all submitted tasks, optionally filtered by status.")
def get_all_tasks(
    status_filter: Optional[str] = Query(None, alias="status", description="Filter tasks by status (e.g., queued, running, completed, failed)")
):
    logger.debug(f"Listing all tasks with status filter: {status_filter}")
    all_tasks_details = task_manager.list_all_tasks(filter_status=status_filter)
    logger.debug(f"Found {len(all_tasks_details)} matching tasks")
    return TaskList(
        tasks=[TaskListItem(**task) for task in all_tasks_details],
        total=len(all_tasks_details)
    )

@router.delete("/research/{task_id}",
            status_code=status.HTTP_200_OK,
            summary="Cancel a research task",
            description="Attempts to cancel a queued task. Running tasks will be marked for cancellation but may complete.")
def cancel_single_task(task_id: str):
    logger.info(f"Attempting to cancel task: {task_id}")
    if not task_manager.get_task_status(task_id):
         logger.warning(f"Task not found for cancellation: {task_id}")
         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found.")

    success = task_manager.cancel_task(task_id)
    if success:
        task_info = task_manager.get_task_status(task_id)
        logger.info(f"Task cancelled successfully: {task_id}")
        return {"task_id": task_id, "notebook_id": task_info.get("notebook_id"), "status": task_info.get("status"), "message": "Task cancellation processed."}
    else:
        logger.warning(f"Task could not be cancelled: {task_id}")
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Task cannot be cancelled (e.g., already completed or failed).")

@router.get("/health", summary="API Health Check")
def health_check():
    logger.debug("Health check requested")
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Define lifespan context manager for startup/shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    logger.info("API server started")

    # Initialize database connection pool
    logger.info("Initializing database connection pool")
    await initialize_db_pool()

    yield

    # Shutdown logic
    # Close database connection pool
    logger.info("Closing database connection pool")
    await close_db_pool()

    logger.info("API server shutting down")

# Create FastAPI app with lifespan
app = FastAPI(
    title="Decipher Research Agent",
    description="API for running intelligent research agents in the background",
    version="0.1.0",
    lifespan=lifespan,
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