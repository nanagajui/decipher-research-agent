# backend/config/settings.py
import os
from pydantic_settings import BaseSettings
from pydantic import Field
from typing import Optional

class Settings(BaseSettings):
    # Application settings
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
    
    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./decipher.db")
    
    # Storage settings
    STORAGE_TYPE: str = os.getenv("STORAGE_TYPE", "local")  # 'local' or 'r2'
    STORAGE_BASE_PATH: str = os.getenv("STORAGE_BASE_PATH", "uploads")
    
    # Qdrant settings
    QDRANT_API_URL: str = os.getenv("QDRANT_API_URL", "http://localhost:6333")
    QDRANT_API_KEY: Optional[str] = os.getenv("QDRANT_API_KEY")
    
    # Cloudflare R2 settings
    CLOUDFLARE_ACCOUNT_ID: Optional[str] = os.getenv("CLOUDFLARE_ACCOUNT_ID")
    CLOUDFLARE_R2_ACCESS_KEY_ID: Optional[str] = os.getenv("CLOUDFLARE_R2_ACCESS_KEY_ID")
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: Optional[str] = os.getenv("CLOUDFLARE_R2_SECRET_ACCESS_KEY")
    
    # API Keys
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY")
    OPENROUTER_API_KEY: Optional[str] = os.getenv("OPENROUTER_API_KEY")
    BRIGHT_DATA_API_TOKEN: Optional[str] = os.getenv("BRIGHT_DATA_API_TOKEN")
    BRIGHT_DATA_BROWSER_AUTH: Optional[str] = os.getenv("BRIGHT_DATA_BROWSER_AUTH")
    LANGTRACE_API_KEY: Optional[str] = os.getenv("LANGTRACE_API_KEY")
    LEMONFOX_API_KEY: Optional[str] = os.getenv("LEMONFOX_API_KEY")
    
    model_config = {
        "env_file": ".env",
        "case_sensitive": True,
        "extra": "allow"  # Allow extra fields from environment variables
    }

settings = Settings()