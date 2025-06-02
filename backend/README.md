# ResearchForge Backend

> The backend service for ResearchForge, built with FastAPI and Python 3.12+.

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- PostgreSQL 14+
- [Poetry](https://python-poetry.org/) (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/researchforge.git
   cd researchforge/backend
   ```

2. **Set up a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   # Install Poetry if you haven't already
   curl -sSL https://install.python-poetry.org | python3 -
   
   # Install dependencies
   poetry install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run database migrations**
   ```bash
   poetry run alembic upgrade head
   ```

6. **Start the development server**
   ```bash
   poetry run uvicorn main:app --reload
   ```

7. Access the API at http://localhost:8000

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🏗 Project Structure

```
backend/
├── alembic/           # Database migrations
├── app/
│   ├── api/          # API routes and endpoints
│   ├── core/          # Core configurations and utilities
│   │   ├── config.py  # Application configuration
│   │   └── security.py # Authentication and security
│   ├── db/            # Database session and connection
│   ├── models/        # SQLAlchemy models
│   ├── schemas/       # Pydantic models
│   └── services/      # Business logic and services
│       ├── ai/        # AI and ML services
│       └── storage/   # File storage services
├── tests/             # Test files
├── alembic.ini        # Alembic configuration
├── main.py            # Application entry point
├── poetry.lock        # Dependency lock file
└── pyproject.toml     # Project metadata and dependencies
```

## ⚙️ Configuration

Create a `.env` file with the following variables:

```env
# Application
DEBUG=True
ENVIRONMENT=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/researchforge

# JWT Authentication
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440  # 24 hours

# CORS
FRONTEND_URL=http://localhost:3000

# AI Services (optional)
OPENAI_API_KEY=your-openai-api-key
LEMONFOX_API_KEY=your-lemonfox-api-key

# Storage
STORAGE_TYPE=local  # or 's3'
S3_BUCKET_NAME=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

## 🧪 Testing

Run tests with pytest:

```bash
poetry run pytest
```

For test coverage:

```bash
poetry run pytest --cov=app --cov-report=term-missing
```

## 🚀 Deployment

### Production with Gunicorn

```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Docker

Build and run with Docker:

```bash
docker-compose up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
