# Getting Started with ResearchForge

> **Note**: ResearchForge is a fork of the original [DecipherIt](https://github.com/mtwn105/decipher-research-agent) project, enhanced with additional features like Firecrawl AI integration, advanced PDF reporting, and improved research capabilities.

This guide will walk you through setting up ResearchForge with a hybrid approach: running Qdrant in Docker and all other services locally for a flexible development experience.

## 🏗 Project Structure

```
decipher-research-agent/
├── backend/             # FastAPI backend
│   └── services/        # AI and processing services
│       └── firecrawl/   # Firecrawl AI integration
├── client/              # Next.js frontend
│   └── app/             # App router pages
│       └── reports/     # PDF report generation
├── docker/              # Docker configuration
├── .env.example         # Example environment variables
└── docker-compose.yml   # Docker Compose configuration
```

## 🛠 Prerequisites

1. **Docker and Docker Compose**
   - Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine
   - Verify installation:
     ```bash
     docker --version
     docker-compose --version
     ```

2. **Git** (if not already installed)
   ```bash
   sudo apt update
   sudo apt install -y git
   ```

3. **FFmpeg** (required for audio processing)
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install -y ffmpeg
   
   # Verify installation
   ffmpeg -version
   ffprobe -version
   ```

## 🔑 Required Accounts and API Keys

You'll need to sign up for the following services and obtain API keys:

1. **Bright Data** - For web scraping
   - Sign up at [Bright Data](https://brightdata.com/)
   - Get your API token from the dashboard
   - (Optional) Set up a Web Unlocker zone

2. **OpenRouter** - For AI model access
   - Sign up at [OpenRouter](https://openrouter.ai/)
   - Get your API key from the dashboard

3. **OpenAI** - For embeddings
   - Sign up at [OpenAI](https://platform.openai.com/)
   - Create an API key

4. **LemonFox** - For text-to-speech
   - Sign up at [LemonFox](https://lemonfox.ai/)
   - Get your API key

5. **Qdrant** - Vector database
   - Local setup is included in the Docker configuration
   - For production, consider [Qdrant Cloud](https://cloud.qdrant.io/)

## 🚀 Project Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/researchforge.git
   cd researchforge
   ```

2. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   nano .env  # Use your preferred text editor
   ```

   Update the `.env` file with your API keys and settings:
   ```env
   # Application
   DEBUG=true
   
   # Database - point to local PostgreSQL
   DATABASE_URL=postgresql://decipher:yoursecurepassword@localhost:5432/decipher_db
   
   # AI Services
   # Note: We've switched to OpenAI as the primary LLM provider
   OPENAI_API_KEY=your_openai_api_key
   
   # Optional: Keep OpenRouter as fallback if needed
   # OPENROUTER_API_KEY=your_openrouter_api_key
   
   # Audio Generation
   LEMONFOX_API_KEY=your_lemonfox_api_key
   
   # Qdrant - use localhost since Qdrant runs in Docker but backend runs locally
   QDRANT_API_URL=http://localhost:6333
   QDRANT_API_KEY=  # Optional for local development
   
   # Storage - use a local path for uploads
   STORAGE_TYPE=local
   STORAGE_BASE_PATH=./uploads
   
   # Audio Processing
   # Make sure FFmpeg is installed and in your system PATH
   # FFMPEG_PATH=/usr/bin/ffmpeg
   # FFPROBE_PATH=/usr/bin/ffprobe
   ```

## 🗄️ Database Setup

### 1. Initialize the Database

Before starting the application, you need to create the database tables. Run the following command:

```bash
# From the project root directory
cd backend
python init_db.py
```

This will create all the necessary tables in your PostgreSQL database.

### 2. Run Database Migrations

After initializing the database, apply any pending migrations:

```bash
alembic upgrade head
```

### 3. Create Required Directories

Create the necessary directories for logs and uploads:

```bash
# Create logs directory
mkdir -p backend/logs

# Create uploads directory
mkdir -p backend/uploads

# Set appropriate permissions
chmod -R 777 backend/logs backend/uploads
```

4. **Configure the frontend**
   ```bash
   cd ../client
   cp .env.example .env.local
   nano .env.local  # Use your preferred text editor
   ```

   Update the `.env.local` file:
   ```env
   # Database URL for Prisma - point to local PostgreSQL
   DATABASE_URL=postgresql://decipher:yoursecurepassword@localhost:5432/decipher_db
   
   # Authentication settings
   BETTER_AUTH_SECRET=your_secure_auth_secret_key
   BETTER_AUTH_URL=http://localhost:3000
   
   # API settings - point to locally running backend
   BACKEND_API_URL=http://localhost:8001
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

## 🛠️ Local Development Setup

### 1. Install Local Dependencies

**PostgreSQL Database**
Install and configure PostgreSQL locally:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS with Homebrew
brew install postgresql
brew services start postgresql
```

Create a database user and database:
```bash
sudo -u postgres psql
```

In the PostgreSQL prompt:
```sql
CREATE USER researchforge WITH PASSWORD 'yoursecurepassword';
CREATE DATABASE researchforge_db OWNER researchforge;
\q
```

**Python Dependencies**
Install backend dependencies:
```bash
cd backend
pip install -e .
```

**Node.js Dependencies**
Install frontend dependencies:
```bash
cd ../client
npm install
# or
pnpm install
```

### 2. 🐳 Start Qdrant in Docker

```bash
# From the project root directory
docker-compose up -d
```

This will start only:
- Qdrant vector database (ports 6333, 6334)

Monitor Qdrant logs:
```bash
docker-compose logs -f qdrant
```

Access the Qdrant dashboard at http://localhost:6333/dashboard

### 3. Run Database Migrations

```bash
cd backend
alembic upgrade head
```

### 4. Start Backend API

```bash
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### 5. Start Frontend

```bash
cd client
npm run dev
# or
pnpm run dev
```

### 6. Access the Services
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- API Documentation: http://localhost:8001/docs
- Qdrant Dashboard: http://localhost:6333/dashboard

## 🔍 Troubleshooting

### Common Issues

1. **Port conflicts**
   - Ensure ports 3000, 5432, 6333, 6334, and 8001 are available
   - Check running containers: `docker ps`

2. **Database connection issues**
   - Verify PostgreSQL is running: `docker-compose ps db`
   - Check logs: `docker-compose logs db`

3. **File permissions**
   - If you see permission errors with the uploads directory:
     ```bash
     mkdir -p backend/uploads
     chmod -R 777 backend/uploads
     ```
   - Double-check all API keys in your `.env` files
   - Ensure services are properly activated in your accounts

4. **Permission issues**
   - Make sure your database user has correct permissions
   - Check file permissions for uploads directory

## 📚 Additional Resources

- [Project Documentation](https://github.com/yourusername/researchforge)
- [CrewAI Documentation](https://docs.crewai.com/)
- [Bright Data MCP Server](https://github.com/brightdata-com/brightdata-mcp)
- [Qdrant Documentation](https://qdrant.tech/documentation/)

## ❓ Need Help?

If you encounter any issues or have questions:

For further assistance, please open an issue on the GitHub repository.
