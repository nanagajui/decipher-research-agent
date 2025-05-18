"""
SQLAlchemy models for the database.
"""

from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

from sqlalchemy import String, Text, Column, ForeignKey, JSON, DateTime, func
from sqlalchemy.orm import declarative_base, relationship, mapped_column, Mapped

# Base class for SQLAlchemy models
Base = declarative_base()

class Task(Base):
    """Task model for the database."""
    __tablename__ = "tasks"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    notebook_id: Mapped[str] = mapped_column(String(36), nullable=False)
    topic: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    sources: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, nullable=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="queued")
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=func.now())
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    failed_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    result: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, nullable=True)
    error: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    def to_dict(self) -> Dict[str, Any]:
        """Convert the model to a dictionary."""
        return {
            "task_id": self.id,
            "notebook_id": self.notebook_id,
            "topic": self.topic,
            "sources": self.sources,
            "status": self.status,
            "created_at": self.created_at,
            "completed_at": self.completed_at,
            "failed_at": self.failed_at,
            "result": self.result,
            "error": self.error
        }