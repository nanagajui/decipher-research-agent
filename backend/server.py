import uvicorn
from dotenv import load_dotenv
from loguru import logger

# Import and setup logging configuration
from config.logging import setup_logging

# Configure logging with loguru
setup_logging(console_level="INFO", file_level="DEBUG")

# Load environment variables
logger.info("Loading environment variables")
load_dotenv()
logger.info("Environment variables loaded")

if __name__ == "__main__":
    logger.info("Starting Decipher Research Agent API server")
    # Note: uvicorn's internal logging will be intercepted by our loguru setup
    uvicorn.run(
        "api:app",
        host="0.0.0.0",
        port=8001,
        log_level="info"
    )