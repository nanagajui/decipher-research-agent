from fastapi import APIRouter, HTTPException, Depends, Request, Response
from fastapi.responses import FileResponse, JSONResponse
import os
from pathlib import Path
from loguru import logger
from typing import Optional
import sys

router = APIRouter()

# Get the project root directory (one level up from the current file)
PROJECT_ROOT = Path(__file__).parent.parent
UPLOADS_DIR = PROJECT_ROOT / "uploads"
AUDIO_DIR = UPLOADS_DIR / "audios"

# Ensure the audio directory exists
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

logger.info(f"Audio files directory: {AUDIO_DIR}")
logger.info(f"Current working directory: {os.getcwd()}")
logger.info(f"Uploads directory exists: {UPLOADS_DIR.exists()}")
logger.info(f"Audio directory exists: {AUDIO_DIR.exists()}")
if AUDIO_DIR.exists():
    logger.info(f"Audio directory contents: {list(AUDIO_DIR.glob('*'))}")

@router.options("/audio/{filename}")
async def options_audio_file():
    """Handle CORS preflight requests"""
    return {"status": "ok"}

@router.get("/audio/{filename}")
async def get_audio_file(filename: str, request: Request):
    """
    Serve an audio file from the local filesystem.
    
    Args:
        filename: The name of the file to serve
        
    Returns:
        The audio file
    """
    try:
        # Security: Prevent directory traversal
        if ".." in filename or "/" in filename or "\\" in filename:
            logger.warning(f"Potential directory traversal attempt: {filename}")
            raise HTTPException(status_code=400, detail="Invalid filename")
            
        # Construct the full path to the audio file
        file_path = AUDIO_DIR / filename
        
        # Log request details for debugging
        logger.info(f"Request URL: {request.url}")
        logger.info(f"Looking for audio file at: {file_path}")
        logger.info(f"File exists: {file_path.exists()}")
        
        if not file_path.exists():
            logger.error(f"Audio file not found: {file_path}")
            logger.error(f"Current working directory: {os.getcwd()}")
            logger.error(f"Directory contents: {list(AUDIO_DIR.glob('*'))}")
            raise HTTPException(status_code=404, detail=f"Audio file not found: {filename}")
            
        # Log file details
        logger.info(f"Serving audio file: {file_path}")
        logger.info(f"File size: {file_path.stat().st_size} bytes")
            
        # Add CORS headers
        headers = {
            "Cache-Control": "public, max-age=3600",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true"
        }
        
        return FileResponse(
            path=file_path,
            media_type="audio/mpeg",
            filename=filename,
            headers=headers
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.exception(f"Error serving audio file {filename}")
        raise HTTPException(
            status_code=500, 
            detail=f"Error serving audio file: {str(e)}"
        )
