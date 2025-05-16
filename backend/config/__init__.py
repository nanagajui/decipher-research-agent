"""
Configuration package for the research agent.
"""
from .llm import llm
from .topic_research.agents import AGENT_CONFIGS as TOPIC_RESEARCH_AGENT_CONFIGS
from .topic_research.tasks import TASK_CONFIGS as TOPIC_RESEARCH_TASK_CONFIGS

__all__ = ["llm", "TOPIC_RESEARCH_AGENT_CONFIGS", "TOPIC_RESEARCH_TASK_CONFIGS"]
