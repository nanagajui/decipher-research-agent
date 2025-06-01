from crewai import LLM
import os
from dotenv import load_dotenv

load_dotenv()

# Use OpenAI instead of OpenRouter due to credit issues
llm = LLM(
    model="gpt-4o",  # Using a capable OpenAI model
    api_key=os.environ["OPENAI_API_KEY"],
    temperature=0.01
)
