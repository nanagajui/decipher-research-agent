from crewai import Agent, Crew, Task, Process
from loguru import logger
from models.chat_models import ChatMessage
from typing import List
from services.qdrant_service import qdrant_service
from config import llm

async def get_relevant_sources(notebook_id: str, query: str):

  logger.info(f"Getting relevant sources from Qdrant for notebook: {notebook_id} with query: {query}")

  results = await qdrant_service.search(query, notebook_id)

  output = ""
  for result in results:
    output += f"{result['content_chunk']}\n---\n"

  logger.info(f"Relevant sources from Qdrant for notebook: {notebook_id} with query: {query} are: {output}")

  return output

def get_decipher_crew():
  decipher_agent = Agent(
    role="Decipher",
    goal="Analyze and decode the user's questions to provide precise answers based on the relevant sources",
    backstory="You're Decipher, an analytical assistant specialized in breaking down complex queries and providing clear, accurate responses drawn from available source materials. Created by Amit Wani",
    verbose=True,
    llm=llm,
  )

  answer_question_task = Task(
    description="""Answer the user's question based on the relevant sources and previous chat context. Do not include any other text than the answer to the question. Only use the sources to answer the question, while maintaining context from the chat history.

    Chat History:
    ```
    {chat_history}
    ```

    User Question:
    ```
    {question}
    ```

    Relevant Sources:
    ```
    {relevant_sources}
    ```
    """,
    expected_output="A clear and concise answer to the user's question",
    agent=decipher_agent,
  )

  return Crew(
    agents=[decipher_agent],
    tasks=[answer_question_task],
    process=Process.sequential,
    verbose=True
  )

async def run_chat_agent(notebook_id: str, messages: List[ChatMessage]):
    logger.info(f"Running chat agent for notebook: {notebook_id} with messages: {messages}")

    chat_history = "\n".join(f"{message.role}: {message.content}" for message in messages[:-1])

    logger.info(f"Chat history: {chat_history}")

    # Rewrite question based on chat history for better vector search
    search_query = llm.call(f"""
    Given the following chat history and current question, rewrite the question to include relevant context that would help with searching a vector database. Focus on key concepts and terminology that should match similar content.

    Chat History:
    ```
    {chat_history}
    ```

    Current Question:
    ```
    {messages[-1].content}
    ```

    Rewrite the question in a way that captures the full context. Only output the rewritten question, nothing else.
    """)

    relevant_sources = await get_relevant_sources(notebook_id, messages[-1].content)

    crew = get_decipher_crew()

    crew_result = await crew.kickoff_async(inputs={
      "question": search_query,
      "chat_history": chat_history,
      "relevant_sources": relevant_sources
    })

    logger.info(f"Crew result for notebook: {notebook_id} with question: {messages[-1].content} is: {crew_result}")

    return crew_result


