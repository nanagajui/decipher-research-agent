from pydantic import BaseModel, Field
from typing import List, Optional

class MindmapNode(BaseModel):
    id: str = Field(..., description="Unique identifier for the node")
    label: str = Field(..., description="The text content of the node (keep concise, 1-3 words)")
    level: int = Field(..., description="The hierarchical level (0 for root, 1 for main branches, 2 for subtopics)")
    parent_id: Optional[str] = Field(None, description="ID of the parent node (None for root)")
    children_ids: List[str] = Field(default_factory=list, description="List of child node IDs")

class MindmapStructure(BaseModel):
    nodes: List[MindmapNode] = Field(..., description="List of all nodes in the mindmap (maximum 3 levels)")
    root_id: str = Field(..., description="ID of the root/central node")
    title: str = Field(..., description="Title of the mindmap")
    description: Optional[str] = Field(None, description="Brief description of the mindmap content")