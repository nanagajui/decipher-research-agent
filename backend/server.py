import uvicorn
import logging
from dotenv import load_dotenv

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

if __name__ == "__main__":
    logger.info("Starting Decipher Research Agent API server")
    uvicorn.run(
        "api:app",
        host="0.0.0.0",
        port=8001,
        log_level="info"
    )