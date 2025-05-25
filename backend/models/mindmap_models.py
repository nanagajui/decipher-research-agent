from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class MindmapStructure(BaseModel):
    """
    Simple nested dictionary structure for mindmap representation.
    Each key represents a topic/subtopic, and its value is a dictionary containing its children.
    Can support up to 5 levels of nesting based on content complexity.

    Example:
    {
        "Main Topic": {
            "Sub Topic 1": {
                "Sub Sub Topic 1": {},
                "Sub Sub Topic 2": {}
            },
            "Sub Topic 2": {}
        }
    }
    """
    mindmap: Dict[str, Any] = Field(..., description="Nested dictionary representing the mindmap hierarchy (up to 5 levels)")
    title: str = Field(..., description="Title of the mindmap")
    description: Optional[str] = Field(None, description="Brief description of the mindmap content")