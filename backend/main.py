# backend/main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from loguru import logger
from typing import List, Optional

from config.settings import settings
from api import router as api_router, lifespan
from fastapi.staticfiles import StaticFiles

# Create uploads directory if it doesn't exist
UPLOAD_DIR = Path(settings.STORAGE_BASE_PATH)
UPLOAD_DIR.mkdir(exist_ok=True, parents=True)

def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    # Determine allowed origins based on environment
    if settings.DEBUG:
        # For development, allow common localhost origins
        allow_origins = [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:8001",
            "http://127.0.0.1:8001",
        ]
    else:
        # In production, you should specify exact origins
        allow_origins = ["https://your-production-domain.com"]

    # Create FastAPI app with lifespan
    app = FastAPI(
        title="Decipher Research Agent API",
        description="API for the Decipher Research Agent",
        version="1.0.0",
        lifespan=lifespan,
    )

    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allow_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include API routes
    app.include_router(api_router, prefix="/api")
    
    # Mount static files for uploads
    app.mount(
        "/uploads", 
        StaticFiles(directory=settings.STORAGE_BASE_PATH), 
        name="uploads"
    )
    
    # Log application startup
    @app.on_event("startup")
    async def startup_event():
        logger.info(f"Application started in {'DEBUG' if settings.DEBUG else 'PRODUCTION'} mode")
        logger.info(f"Allowed CORS origins: {', '.join(allow_origins) if allow_origins else 'None'}")
    
    return app

# Create the application instance
app = create_app()