from crewai import Agent, Crew, Task, Process
from loguru import logger
from config import llm
from models.mindmap_models import MindmapStructure
from services.qdrant_service import qdrant_service
import uuid

def get_mindmap_crew():
    # Define Agents
    content_analyzer = Agent(
        name="Content Analyzer",
        role="Research Content Analyst",
        goal="Analyze research content to identify main themes, subtopics, and hierarchical relationships",
        backstory="You are an expert content analyst who excels at breaking down complex research into logical hierarchical structures and identifying key relationships between concepts.",
        llm=llm,
        verbose=True
    )

    structure_designer = Agent(
        name="Structure Designer",
        role="Information Architect",
        goal="Design the hierarchical structure and organization of the mindmap",
        backstory="You are an information architect who specializes in creating clear, logical hierarchical structures that effectively organize complex information into digestible visual formats.",
        llm=llm,
        verbose=True
    )

    mindmap_builder = Agent(
        name="Mindmap Builder",
        role="Mindmap Creator",
        goal="Create the final mindmap structure with proper node relationships and hierarchy",
        backstory="You are a mindmap specialist who transforms structured information into well-organized mindmap formats with clear parent-child relationships and logical flow.",
        llm=llm,
        verbose=True
    )

    # Tasks
    analyze_content_task = Task(
        description="""
        Analyze the research content and identify:
        - The main central theme/topic (1 clear topic)
        - Primary categories or main branches (4-6 major themes maximum)
        - Secondary subtopics under each main branch (2-4 per branch maximum)
        - Keep it simple with only 3 levels maximum

        Research Content:
        ```
        {research}
        ```

        Create a simple hierarchical breakdown that shows:
        1. Central topic (Level 0)
        2. Main categories/branches (Level 1) - 4-6 items
        3. Key subtopics (Level 2) - 2-4 per branch

        Keep labels concise (1-3 words each). Focus on the most important themes only.
        """,
        expected_output="A simple 3-level hierarchical breakdown with concise labels and clear relationships.",
        agent=content_analyzer
    )

    design_structure_task = Task(
        description="""
        Using the hierarchical breakdown from the content analysis, design a simple mindmap structure that:
        - Has ONE clear central node representing the main topic
        - Organizes 4-6 main branches around the center
        - Each branch has 2-4 subtopics maximum
        - Uses ONLY 3 levels total (0, 1, 2)
        - Keeps node labels very concise (1-3 words per node)
        - Groups related concepts together logically

        Simple structure rules:
        - Level 0: Central topic (1 node)
        - Level 1: Main categories (4-6 nodes)
        - Level 2: Key subtopics (2-4 per category)

        Keep it clean and simple. Avoid overcomplicated structures.
        Create a clear outline showing the 3-level hierarchy.
        """,
        expected_output="A simple 3-level mindmap structure outline with concise labels and clear relationships.",
        agent=structure_designer,
        context=[analyze_content_task]
    )

    build_mindmap_task = Task(
        description="""
        Create the final simple mindmap structure using the design from the previous task.

        Generate a clean mindmap with:
        - Unique IDs for each node (use simple names like "root", "topic1", "subtopic1a")
        - Clear parent-child relationships
        - EXACTLY 3 levels only (0, 1, 2)
        - Very concise labels (1-3 words maximum)
        - Proper connections between nodes

        Strict rules for node creation:
        - Level 0: ONE root node (central topic)
        - Level 1: 4-6 main category nodes
        - Level 2: 2-4 subtopic nodes per category
        - Each node must have a unique, simple ID
        - Parent-child relationships must be correctly established
        - Node labels must be 1-3 words only
        - No more than 3 levels total

        Keep the structure simple and clean. Use the outline from the previous task.
        """,
        expected_output="A simple 3-level mindmap structure with concise labels and proper relationships.",
        output_pydantic=MindmapStructure,
        agent=mindmap_builder,
        context=[design_structure_task]
    )

    # Crew
    return Crew(
        agents=[content_analyzer, structure_designer, mindmap_builder],
        tasks=[analyze_content_task, design_structure_task, build_mindmap_task],
        process=Process.sequential,
        verbose=True,
    )


async def run_mindmap_agent(notebook_id: str):
    """
    Run the mindmap agent to create a mindmap from research content.

    Args:
        notebook_id (str): The ID of the notebook containing the research content

    Returns:
        dict: The mindmap structure as a dictionary
    """
    logger.info(f"Running mindmap agent for notebook: {notebook_id}")

    chunks = await qdrant_service.get_all_chunks_by_notebook_id(notebook_id)

    research = "\n\n".join(
        chunk["content_chunk"]
        for chunk in chunks
    )

    logger.debug(f"Research content length: {len(research)} characters")

    crew = get_mindmap_crew()

    crew_result = await crew.kickoff_async(inputs={
        "research": research,
    })

    logger.info(f"Mindmap creation for notebook: {notebook_id} completed successfully")

    return crew_result.pydantic.model_dump()