from dotenv import load_dotenv
import logging
import asyncio
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
logger.info("Loading environment variables")
load_dotenv()
logger.info("Environment variables loaded")

from agents.topic_research_agent import run_research_crew

async def main():
    try:
        logger.info("Starting the application")
        input_topic = "India vs Pakistan"
        logger.info(f"Topic: {input_topic}")

        result = await run_research_crew(input_topic)
        logger.info(f"Result: {result}")
    except Exception as e:
        logger.error(f"Fatal error in main: {str(e)}", exc_info=True)
        raise

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Process interrupted by user")
        sys.exit(0)
    except Exception as e:
        logger.error(f"Fatal error: {str(e)}", exc_info=True)
        sys.exit(1)
