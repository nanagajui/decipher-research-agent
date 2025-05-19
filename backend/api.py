from fastapi import FastAPI, HTTPException, status, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from datetime import datetime
from contextlib import asynccontextmanager

from services import task_manager, initialize_db_pool, close_db_pool
from models.task_models import (
    ResearchRequest,
    TaskResponse,
    TaskStatusResponse
)

# Create router for API endpoints
router = APIRouter(prefix="/api")

# API Endpoints
@router.post("/research",
          response_model=TaskResponse,
          status_code=status.HTTP_202_ACCEPTED,
          summary="Submit a new research task",
          description="Submits a topic for research. The task runs in the background.")
async def submit_research_task(request: ResearchRequest):
    logger.info(f"Submitting research task for notebook: {request.notebook_id}" +
               (f" on topic: {request.topic}" if request.topic else ""))

    task_id = await task_manager.submit_task_async(
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
async def get_task_details(task_id: str):
    logger.debug(f"Getting details for task ID: {task_id}")

    # Use the async version to avoid event loop conflicts
    task_info = await task_manager.get_task_status_async(task_id)

    if not task_info:
        logger.warning(f"Task not found: {task_id}")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found.")
    return TaskStatusResponse(**task_info, task_id=task_id)

@router.get("/health", summary="API Health Check")
async def health_check():
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