import os
from dotenv import load_dotenv
from loguru import logger

# Load environment variables
logger.info("Loading environment variables")
load_dotenv()
logger.info("Environment variables loaded")

os.environ['CREWAI_DISABLE_TELEMETRY'] = 'true'

# Initialize Langtrace
# logger.info("Initializing Langtrace")
# from langtrace_python_sdk import langtrace
# langtrace.init(api_key=os.getenv('LANGTRACE_API_KEY'))
# logger.info("Langtrace initialized")

# Import and setup logging configuration
from config.logging import setup_logging

# Configure logging with loguru
setup_logging(console_level="INFO", file_level="DEBUG")

from api import app

if __name__ == "__main__":
    logger.info("Starting Decipher Research Agent API server")
