import asyncio
import threading
from typing import Dict, Optional, List, Any
from concurrent.futures import ThreadPoolExecutor
from loguru import logger

from agents.topic_research_agent import run_research_crew
from models.db import NotebookProcessingStatusValue
from .task_repository import task_repository
from .notebook_repository import notebook_repository

class TaskManager:
    def __init__(self, max_workers=5):
        # ThreadPoolExecutor to manage background tasks
        self._executor = ThreadPoolExecutor(max_workers=max_workers)
        self._lock = threading.RLock()  # Reentrant lock for thread-safe operations
        logger.info(f"TaskManager initialized with {max_workers} workers")

    async def _execute_task(self, task_id: str, topic: Optional[str], notebook_id: str, sources: Optional[List] = None):
        """Internal method to run the research task and update status."""
        max_retries = 1
        retry_count = 0

        # Update notebook status to IN_PROGRESS
        await notebook_repository.update_notebook_status(
            notebook_id,
            NotebookProcessingStatusValue.IN_PROGRESS,
            "Research task started"
        )

        while retry_count < max_retries:
            try:
                # Update task status to running
                await task_repository.update_task_status(task_id, "running")

                logger.info(f"Task {task_id} started for notebook: {notebook_id}" +
                           (f" on topic: {topic}" if topic else "") +
                           (f" (retry {retry_count}/{max_retries-1})" if retry_count > 0 else ""))

                # Use loguru's context feature to add task_id to all logs in this thread
                with logger.contextualize(task_id=task_id):
                    result = await run_research_crew(topic)

                # Update task as completed with result
                await task_repository.update_task_result(task_id, result, "completed")

                # Save research result to notebook output
                if result and isinstance(result, dict) and "blog_post" in result:
                    await notebook_repository.save_notebook_output(notebook_id, result["blog_post"])
                elif result and isinstance(result, str):
                    # Handle case where result is a string
                    await notebook_repository.save_notebook_output(notebook_id, result)
                elif result:
                    # Fallback: convert result to string if it's not in expected format
                    await notebook_repository.save_notebook_output(notebook_id, str(result))

                # Update notebook status to PROCESSED
                await notebook_repository.update_notebook_status(
                    notebook_id,
                    NotebookProcessingStatusValue.PROCESSED,
                    "Research completed successfully"
                )

                logger.success(f"Task {task_id} completed successfully")
                return  # Exit function on success

            except Exception as e:
                retry_count += 1
                # Log the error but keep retrying if we haven't hit the limit
                if retry_count < max_retries:
                    logger.warning(f"Task {task_id} failed (attempt {retry_count}/{max_retries-1}): {e}")
                    continue

                # Using loguru's exception tracking capability for the final failure
                logger.opt(exception=True).error(f"Task {task_id} failed after {retry_count} attempts: {e}")

                # Update task as failed with error
                await task_repository.update_task_error(task_id, str(e))

                # Update notebook status to ERROR
                await notebook_repository.update_notebook_status(
                    notebook_id,
                    NotebookProcessingStatusValue.ERROR,
                    f"Research failed. Please try again."
                )
                return

    async def submit_task_async(self, notebook_id: str, topic: Optional[str] = None, sources: Optional[List] = None) -> str:
        """Async implementation for submitting a new research task."""
        # Create the task in the database first
        task_id = await task_repository.create_task(notebook_id, topic, sources)

        # Start the background task using the existing event loop
        asyncio.create_task(self._execute_task(task_id, topic, notebook_id, sources))

        logger.info(f"Task {task_id} submitted for notebook: {notebook_id}" + (f" on topic: {topic}" if topic else ""))
        return task_id

# Singleton instance
task_manager = TaskManager(max_workers=5)