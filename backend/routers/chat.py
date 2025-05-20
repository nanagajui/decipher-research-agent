from fastapi import APIRouter, status, Depends, HTTPException
from loguru import logger
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from services import qdrant_service

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatMessageInput(BaseModel):
    """Schema for chat message input"""
    message: str = Field(..., description="The chat message content")
    notebook_id: str = Field(..., description="The ID of the notebook this message belongs to")
    metadata: Optional[dict] = Field(default=None, description="Additional metadata for the message")


@router.post("/message", status_code=status.HTTP_201_CREATED)
async def receive_chat_message(chat_input: ChatMessageInput):
    """
    Endpoint to receive a new chat message

    Args:
        chat_input: The chat message data including message text and notebook ID

    Returns:
        dict: A response with message details and status
    """
    try:
        logger.info(f"Received chat message for notebook: {chat_input.notebook_id}")



        return {
            "status": "success",
            "message": "Chat message received",
            "timestamp": datetime.now().isoformat(),
            "notebook_id": chat_input.notebook_id
        }
    except Exception as e:
        logger.error(f"Error processing chat message: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process chat message"
        )

