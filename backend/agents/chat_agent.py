from crewai import Agent, Crew, Task, Process
from loguru import logger
from models.chat_models import ChatMessage
from typing import List
from services.qdrant_service import qdrant_service
async def get_relevant_sources(notebook_id: str, query: str):

  logger.info(f"Getting relevant sources from Qdrant for notebook: {notebook_id} with query: {query}")

  results = await qdrant_service.search(query, notebook_id)

  output = ""
  for result in results:
    output += f"{result['content_chunk']}\n---\n"

  logger.info(f"Relevant sources from Qdrant for notebook: {notebook_id} with query: {query} are: {output}")

  return output

async def run_chat_agent(notebook_id: str, messages: List[ChatMessage]):
    logger.info(f"Running chat agent for notebook: {notebook_id} with messages: {messages}")

    # Get relevant sources
    relevant_sources = await get_relevant_sources(notebook_id, messages[-1].content)



    pass


