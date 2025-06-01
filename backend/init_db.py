"""
Database initialization script to create all tables defined in SQLAlchemy models.
"""

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
import os
from loguru import logger

from models.db import Base
from services.db_service import DATABASE_URL

async def create_tables():
    """Create all tables defined in SQLAlchemy models."""
    logger.info("Creating database tables...")
    
    # Create engine for table creation
    engine = create_async_engine(DATABASE_URL, echo=True)
    
    try:
        # Create all tables
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error creating tables: {e}")
        raise
    finally:
        # Dispose engine
        await engine.dispose()

if __name__ == "__main__":
    # Run the async function to create tables
    asyncio.run(create_tables())
