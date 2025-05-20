from fastapi import APIRouter, status
from loguru import logger

router = APIRouter(prefix="/chat", tags=["chat"])

# This router is currently empty and will be implemented later
# Future endpoints will handle chat functionality