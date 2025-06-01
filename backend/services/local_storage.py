# backend/services/local_storage.py
"""
Local file storage service to replace Cloudflare R2 for development and self-hosting.
"""
import os
import shutil
import uuid
from pathlib import Path
from typing import Optional, BinaryIO, Union
from loguru import logger

class LocalStorageService:
    """Service for handling file storage on the local filesystem."""
    
    def __init__(self, base_path: str = "uploads"):
        """
        Initialize local storage service.
        
        Args:
            base_path: Base directory for storing all files
        """
        self.base_path = Path(base_path).resolve()
        self.audios_path = self.base_path / "audios"
        self.documents_path = self.base_path / "documents"
        self.setup_directories()
        
    def setup_directories(self):
        """Ensure all required directories exist."""
        self.audios_path.mkdir(parents=True, exist_ok=True)
        self.documents_path.mkdir(parents=True, exist_ok=True)
        logger.info(f"Local storage initialized at: {self.base_path}")
    
    async def upload_file(
        self,
        file_content: bytes,
        file_extension: str,
        prefix: str = "file",
        subfolder: str = "misc"
    ) -> str:
        """
        Save file locally.
        
        Args:
            file_content: The file content as bytes
            file_extension: File extension (without dot)
            prefix: Prefix for the filename
            subfolder: Subfolder to store the file in
            
        Returns:
            Relative path to the saved file
        """
        try:
            # Create subfolder if it doesn't exist
            target_dir = self.base_path / subfolder
            target_dir.mkdir(parents=True, exist_ok=True)
            
            # Generate filename
            random_id = str(uuid.uuid4())[:8]
            filename = f"{prefix}_{random_id}.{file_extension}"
            file_path = target_dir / filename
            
            # Save file
            with open(file_path, "wb") as f:
                f.write(file_content)
                
            relative_path = f"/{subfolder}/{filename}"
            logger.info(f"File saved: {file_path}")
            return relative_path
            
        except Exception as e:
            error_msg = f"Failed to save file: {str(e)}"
            logger.error(error_msg)
            raise Exception(error_msg)
    
    async def upload_audio_file(
        self,
        audio_content: bytes,
        notebook_id: str,
        file_extension: str = "mp3"
    ) -> str:
        """
        Save audio file locally.
        
        Args:
            audio_content: The audio file content as bytes
            notebook_id: The notebook ID to use in the filename
            file_extension: File extension (default: mp3)
            
        Returns:
            URL path to access the file
        """
        logger.info(f"Saving audio file for notebook: {notebook_id}")
        return await self.upload_file(
            audio_content,
            file_extension,
            prefix=f"notebook_{notebook_id}_audio",
            subfolder="audios"
        )
    
    async def get_file(self, file_path: str) -> bytes:
        """
        Retrieve a file's content.
        
        Args:
            file_path: Relative path to the file
            
        Returns:
            File content as bytes
        """
        try:
            full_path = self.base_path / file_path.lstrip('/')
            with open(full_path, "rb") as f:
                return f.read()
        except Exception as e:
            error_msg = f"Failed to read file {file_path}: {str(e)}"
            logger.error(error_msg)
            raise Exception(error_msg)
    
    async def delete_file(self, file_path: str) -> bool:
        """
        Delete a file.
        
        Args:
            file_path: Relative path to the file
            
        Returns:
            bool: True if deletion was successful
        """
        try:
            full_path = self.base_path / file_path.lstrip('/')
            if full_path.exists():
                full_path.unlink()
                return True
            return False
        except Exception as e:
            error_msg = f"Failed to delete file {file_path}: {str(e)}"
            logger.error(error_msg)
            return False
    
    def get_public_url(self, file_path: str) -> str:
        """
        Get URL for a locally stored file.
        
        Args:
            file_path: Relative path to the file
            
        Returns:
            URL path to access the file
        """
        return file_path

# Singleton instance
local_storage = LocalStorageService()