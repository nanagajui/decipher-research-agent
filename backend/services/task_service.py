import asyncio
import uuid
import threading
from typing import Dict, Optional, List, Any
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor
from loguru import logger

from agents.topic_research_agent import run_research_crew

class TaskManager:
    def __init__(self, max_workers=5):
        self._tasks: Dict[str, Dict[str, Any]] = {}
        self._lock = threading.RLock()  # Reentrant lock for safe concurrent access
        # ThreadPoolExecutor to manage background tasks
        self._executor = ThreadPoolExecutor(max_workers=max_workers)
        logger.info(f"TaskManager initialized with {max_workers} workers")

    def _execute_task(self, task_id: str, topic: str):
        """Internal method to run the research task and update status."""
        max_retries = 3
        retry_count = 0

        while retry_count < max_retries:
            try:
                with self._lock:
                    self._tasks[task_id]["status"] = "running"
                    if retry_count > 0:
                        self._tasks[task_id]["retry_count"] = retry_count

                logger.info(f"Task {task_id} started for topic: {topic}" +
                           (f" (retry {retry_count}/{max_retries-1})" if retry_count > 0 else ""))

                # Each thread needs its own event loop for asyncio tasks
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)

                # Use loguru's context feature to add task_id to all logs in this thread
                with logger.contextualize(task_id=task_id):
                    result = loop.run_until_complete(run_research_crew(topic))

                loop.close()

                with self._lock:
                    self._tasks[task_id]["status"] = "completed"
                    self._tasks[task_id]["result"] = result
                    self._tasks[task_id]["completed_at"] = datetime.now().isoformat()
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
                with self._lock:
                    self._tasks[task_id]["status"] = "failed"
                    self._tasks[task_id]["error"] = str(e)
                    self._tasks[task_id]["retry_count"] = retry_count
                    self._tasks[task_id]["failed_at"] = datetime.now().isoformat()
                return

    def submit_task(self, topic: str) -> str:
        """Submits a new research task and returns its ID."""
        task_id = str(uuid.uuid4())
        with self._lock:
            self._tasks[task_id] = {
                "topic": topic,
                "status": "queued",
                "created_at": datetime.now().isoformat(),
                "result": None,
                "error": None,
                "completed_at": None,
                "failed_at": None
            }
        self._executor.submit(self._execute_task, task_id, topic)
        logger.info(f"Task {task_id} submitted for topic: {topic}")
        return task_id

    def get_task_status(self, task_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves the status and details of a specific task."""
        with self._lock:
            task = self._tasks.get(task_id)
            if task:
                logger.debug(f"Retrieved task {task_id} with status: {task['status']}")
            else:
                logger.debug(f"Task {task_id} not found")
            return task

    def list_all_tasks(self, filter_status: Optional[str] = None) -> List[Dict[str, Any]]:
        """Lists all tasks, optionally filtered by status."""
        with self._lock:
            tasks_list = []
            for task_id, details in self._tasks.items():
                if filter_status and details["status"] != filter_status:
                    continue
                task_info = details.copy()
                task_info["task_id"] = task_id
                tasks_list.append(task_info)

            if filter_status:
                logger.debug(f"Found {len(tasks_list)} tasks with status '{filter_status}'")
            else:
                logger.debug(f"Listed all {len(tasks_list)} tasks")
            return tasks_list

    def cancel_task(self, task_id: str) -> bool:
        """Attempts to mark a task as cancelled.
           Note: This is a soft cancel; it won't stop an already running task thread.
        """
        with self._lock:
            task = self._tasks.get(task_id)
            if not task:
                logger.warning(f"Cannot cancel task {task_id}: not found")
                return False

            if task["status"] in ["queued", "running"]:
                new_status = "cancelled" if task["status"] == "queued" else "cancellation_requested"
                task["status"] = new_status
                logger.info(f"Task {task_id} marked as {new_status}")
                return True

            logger.warning(f"Cannot cancel task {task_id}: status is {task['status']}")
            return False

# Singleton instance
task_manager = TaskManager(max_workers=5)