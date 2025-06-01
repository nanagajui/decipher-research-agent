from fastapi import APIRouter
from loguru import logger
from datetime import datetime
from contextlib import asynccontextmanager

from services import initialize_db_pool, close_db_pool
from routers.research import router as research_router
from routers.chat import router as chat_router

# Create router for API endpoints
router = APIRouter()

@router.get("/health", summary="API Health Check")
async def health_check():
    """Health check endpoint for the API."""
    logger.debug("Health check requested")
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Define lifespan context manager for startup/shutdown events
@asynccontextmanager
async def lifespan(app):
    """Handle application startup and shutdown events."""
    # Startup logic
    logger.info("Initializing application...")
    
    # Initialize database connection pool
    logger.info("Initializing database connection pool")
    await initialize_db_pool()

    yield

    # Shutdown logic
    logger.info("Shutting down application...")
    
    # Close database connection pool
    logger.info("Closing database connection pool")
    await close_db_pool()
    
    logger.info("Application shutdown complete")

# Include the routers with their own prefixes
router.include_router(research_router, prefix="/research")
router.include_router(chat_router, prefix="/chat")

# Export the router and lifespan for use in main.py
__all__ = ["router", "lifespan"]