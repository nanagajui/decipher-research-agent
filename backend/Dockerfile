# Use this single Dockerfile
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY pyproject.toml uv.lock ./

# Install Python dependencies using uv
RUN pip install --no-cache-dir uv && \
    uv pip install --no-cache-dir -e .

# Copy the rest of the application code
COPY . .

# Create necessary directories
RUN mkdir -p /app/uploads && \
    mkdir -p /app/logs && \
    chmod 777 /app/logs

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Expose port
EXPOSE 8001

# Set the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]

# Default command (can be overridden)
CMD ["gunicorn", "server:app", "--workers", "1", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8001", "--timeout", "0", "--keep-alive", "5"]