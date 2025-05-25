from crewai import Agent, Crew, Task, Process
from loguru import logger
from config import llm
from models.audio_overview_models import AudioOverviewTranscript
from services.qdrant_service import qdrant_service

def get_audio_overview_crew():
  # Define Agents
  research_analyst = Agent(
    name="Research Analyst",
    role="Content Analyst",
    goal="Analyze and extract key insights, themes, and important points from research content while maintaining factual accuracy and context.",
    backstory="You are an expert research analyst with years of experience distilling complex information into clear, actionable insights.",
    llm=llm,
    verbose=True
  )

  conversation_planner = Agent(
    name="Conversation Planner",
    role="Dialogue Architect",
    goal="Create engaging, natural-flowing podcast conversation outlines that effectively communicate key research findings.",
    backstory="You are a seasoned podcast producer who excels at structuring compelling conversations that educate and engage listeners.",
    llm=llm,
    verbose=True
  )

  script_writer = Agent(
    name="Script Writer",
    role="Dialogue Creator",
    goal="Transform outlines into natural, engaging podcast conversations that effectively communicate complex topics.",
    backstory="You are an accomplished scriptwriter specializing in educational content and engaging dialogue.",
    llm=llm,
    verbose=True
  )

  # Tasks
  analyze_research_task = Task(
    description="""
    Analyze the provided research content and create a comprehensive bullet-point summary that:
    - Identifies the main themes and key insights
    - Highlights important supporting details and examples
    - Maintains factual accuracy and proper context
    - Organizes points in a logical flow

    Research Content:
    ```
    {research}
    ```
    """,
    expected_output="A structured bullet-point summary capturing key insights and themes from the research.",
    agent=research_analyst
  )

  create_conversation_outline_task = Task(
    description="""
    Create an engaging podcast conversation outline based on the research summary that:
    - Structures topics in a natural, flowing conversation between Alex (host) and Jamie
    - Includes specific talking points and transitions for both speakers
    - Balances educational content with engaging dialogue
    - Ensures key research points are effectively communicated
    - Plans for Alex to guide the conversation as the host while Jamie provides expert insights

    Use the summary from the previous task to guide the conversation structure.
    """,
    expected_output="A detailed conversation outline with clear topics, questions, and talking points for Alex (host) and Jamie.",
    agent=conversation_planner,
    context=[analyze_research_task]
  )

  write_podcast_script_task = Task(
    description="""
    Write a natural, engaging podcast conversation between Alex and Jamie that:
    - Follows the provided outline while maintaining natural dialogue
    - Effectively communicates key research points
    - Keeps the conversation flowing and engaging
    - Stays within 3 minutes (~500 words)
    - Uses appropriate tone and language for the topic

    Format each dialogue segment as an object with 'name' and 'transcript' fields.
    The name field must be either 'Alex' or 'Jamie'.
    """,
    expected_output="A structured podcast transcript with alternating speakers, natural dialogue, and clear communication of key points.",
    output_pydantic=AudioOverviewTranscript,
    agent=script_writer,
    context=[create_conversation_outline_task]
  )
  # Crew
  return Crew(
    agents=[research_analyst, conversation_planner, script_writer],
    tasks=[analyze_research_task, create_conversation_outline_task, write_podcast_script_task],
    process=Process.sequential,
    verbose=True,
  )


async def run_audio_overview_agent(notebook_id: str):
    logger.info(f"Running audio overview agent for notebook: {notebook_id}")

    chunks = await qdrant_service.get_all_chunks_by_notebook_id(notebook_id)

    research = "\n\n".join(
        chunk["content_chunk"]
        for chunk in chunks
    )

    logger.debug(f"Research content length: {len(research)} characters")

    crew = get_audio_overview_crew()

    crew_result = await crew.kickoff_async(inputs={
      "research": research,
    })

    logger.info(f"Audio overview result for notebook: {notebook_id} completed successfully")

    return [transcript.model_dump() for transcript in crew_result["transcript"]]


