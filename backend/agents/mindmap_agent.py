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
        goal="Analyze research content to identify main themes, subtopics, and hierarchical relationships up to 5 levels deep",
        backstory="You are an expert content analyst who excels at breaking down complex research into logical hierarchical structures and identifying key relationships between concepts at multiple levels of detail.",
        llm=llm,
        verbose=True
    )

    mindmap_creator = Agent(
        name="Mindmap Creator",
        role="Mindmap Specialist",
        goal="Create the final mindmap structure as a nested dictionary with proper hierarchical relationships based on content analysis",
        backstory="You are a mindmap specialist who transforms analyzed content into well-organized nested dictionary formats with clear hierarchical relationships and logical flow.",
        llm=llm,
        verbose=True
    )

    # Tasks
    analyze_content_task = Task(
        description="""
        Analyze the research content and identify hierarchical themes with appropriate depth (up to 5 levels):

        - Level 1: ONE main central topic/theme (the overarching subject)
        - Level 2: Primary categories under the main topic (3-6 major categories)
        - Level 3: Secondary subtopics under each category (2-5 per category)
        - Level 4: Detailed aspects (if content warrants it, 2-4 per subtopic)
        - Level 5: Specific details (only if highly detailed content, 1-3 per aspect)

        Research Content:
        ```
        {research}
        ```

        Determine the appropriate depth based on content complexity:
        - Simple content: 2-3 levels
        - Moderate content: 3-4 levels
        - Complex content: 4-5 levels

        Create a hierarchical breakdown with:
        - ONE main topic at the root level that encompasses the entire research
        - Concise labels (1-4 words each)
        - Logical grouping of related concepts under the main topic
        - Appropriate depth based on content richness
        - Clear parent-child relationships
        """,
        expected_output="A hierarchical breakdown with appropriate depth (2-5 levels) based on content complexity, with concise labels and clear relationships.",
        agent=content_analyzer
    )

    create_mindmap_task = Task(
        description="""
        Create the final mindmap structure as a nested dictionary using the hierarchical breakdown from the content analysis.

        Generate a clean nested dictionary structure where:
        - Each key is a topic/subtopic name (concise, 1-4 words)
        - Each value is a dictionary containing its children
        - Empty dictionaries {} represent leaf nodes (no children)
        - Structure depth adapts to content complexity (2-5 levels)
        - Start with ONE main topic that encompasses all the research content

        Example format:
        {
            "Main Research Topic": {
                "Category A": {
                    "Subtopic 1": {
                        "Detail 1": {},
                        "Detail 2": {}
                    },
                    "Subtopic 2": {}
                },
                "Category B": {
                    "Subtopic 3": {}
                }
            }
        }

        Structure guidelines:
        - Level 1: ONE main topic (the central theme of all research)
        - Level 2: Primary categories under the main topic (3-6 categories)
        - Level 3: Secondary subtopics under each category (2-5 per category)
        - Level 4: Detailed aspects (if needed, 2-4 per subtopic)
        - Level 5: Specific details (if highly detailed, 1-3 per aspect)

        Rules:
        - Use the exact nested dictionary format shown above
        - Start with ONE main topic that encompasses all the research content
        - Keep topic names concise but descriptive
        - Only create levels that add meaningful organization
        - Ensure logical parent-child relationships
        - Adapt depth to content complexity (don't force 5 levels if content is simple)
        """,
        expected_output="A nested dictionary structure representing the mindmap hierarchy with appropriate depth based on content complexity.",
        output_pydantic=MindmapStructure,
        agent=mindmap_creator,
        context=[analyze_content_task]
    )

    # Crew
    return Crew(
        agents=[content_analyzer, mindmap_creator],
        tasks=[analyze_content_task, create_mindmap_task],
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