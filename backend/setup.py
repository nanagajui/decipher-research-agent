from setuptools import setup, find_packages

setup(
    name="backend",
    version="0.1.0",
    packages=find_packages(include=["agents", "agents.*", "config", "config.*", "models", "models.*", "routers", "routers.*", "services", "services.*"]),
)
