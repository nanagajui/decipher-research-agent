import logging
import asyncio
import uuid
import threading
from typing import Dict, Optional, List, Any
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor

from agents.topic_research_agent import run_research_crew

logger = logging.getLogger(__name__)

class TaskManager:
    def __init__(self, max_workers=5):
        self._tasks: Dict[str, Dict[str, Any]] = {}
        self._lock = threading.RLock()  # Reentrant lock for safe concurrent access
        # ThreadPoolExecutor to manage background tasks
        self._executor = ThreadPoolExecutor(max_workers=max_workers)

    def _execute_task(self, task_id: str, topic: str):
        """Internal method to run the research task and update status."""
        try:
            with self._lock:
                self._tasks[task_id]["status"] = "running"

            logger.info(f"Task {task_id} started for topic: {topic}")

            # Each thread needs its own event loop for asyncio tasks
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            result = loop.run_until_complete(run_research_crew(topic))
            loop.close()

            with self._lock:
                self._tasks[task_id]["status"] = "completed"
                self._tasks[task_id]["result"] = result
                self._tasks[task_id]["completed_at"] = datetime.now().isoformat()
            logger.info(f"Task {task_id} completed successfully.")

        except Exception as e:
            logger.error(f"Task {task_id} failed: {e}", exc_info=True)
            with self._lock:
                self._tasks[task_id]["status"] = "failed"
                self._tasks[task_id]["error"] = str(e)
                self._tasks[task_id]["failed_at"] = datetime.now().isoformat()

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
            return self._tasks.get(task_id)

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
            return tasks_list

    def cancel_task(self, task_id: str) -> bool:
        """Attempts to mark a task as cancelled.
           Note: This is a soft cancel; it won't stop an already running task thread.
        """
        with self._lock:
            task = self._tasks.get(task_id)
            if not task:
                return False

            if task["status"] in ["queued", "running"]:
                new_status = "cancelled" if task["status"] == "queued" else "cancellation_requested"
                task["status"] = new_status
                logger.info(f"Task {task_id} marked as {new_status}.")
                return True
            return False

# Singleton instance
task_manager = TaskManager(max_workers=5)