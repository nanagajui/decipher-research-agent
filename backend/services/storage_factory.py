# backend/services/storage_factory.py
"""
Factory for creating storage service instances.
"""
from typing import Optional, Type, Any
from loguru import logger
from .r2_service import R2Service
from .local_storage import LocalStorageService

class StorageType:
    R2 = "r2"
    LOCAL = "local"

class StorageFactory:
    _instance = None
    
    @classmethod
    def get_storage(cls, storage_type: Optional[str] = None):
        """
        Get storage service instance.
        
        Args:
            storage_type: Type of storage to use ('r2' or 'local')
            
        Returns:
            Storage service instance
        """
        if storage_type is None:
            # Default to local storage if no type specified
            storage_type = StorageType.LOCAL
            
        if storage_type == StorageType.R2:
            logger.info("Using Cloudflare R2 storage")
            return R2Service()
        elif storage_type == StorageType.LOCAL:
            logger.info("Using local filesystem storage")
            return LocalStorageService()
        else:
            raise ValueError(f"Unsupported storage type: {storage_type}")

# Global storage instance
storage = StorageFactory.get_storage()