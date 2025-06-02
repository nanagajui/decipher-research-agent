# 🚀 ResearchForge - Advanced AI Research Assistant

<div align="center">

![ResearchForge Logo](https://img.shields.io/badge/ResearchForge-AI%20Research%20Platform-blue?style=for-the-badge&logo=lightbulb)

**Transform your research with AI-powered intelligence**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.12-blue?style=flat-square&logo=python)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://typescriptlang.org/)

[🚀 Get Started](#-quick-start) • [📚 Features](#-key-features) • [💻 Development](#-development)

</div>

## ✨ Overview

ResearchForge is an AI-powered research platform that helps you discover, analyze, and present information efficiently. Built with modern web technologies, ResearchForge transforms complex data into actionable insights with beautiful reports and interactive visualizations.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) 18+
- [Python](https://www.python.org/) 3.12+
- [PostgreSQL](https://www.postgresql.org/) 14+
- [Docker](https://www.docker.com/) (optional, for containerized deployment)
- [pnpm](https://pnpm.io/) (recommended package manager)

### Getting Started

For detailed setup instructions, including environment configuration and database setup, please see our [Getting Started Guide](./GETTING-STARTED.md).

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/researchforge.git
   cd researchforge
   ```

2. **Start the development servers**
   
   In one terminal (backend):
   ```bash
   cd backend
   poetry run uvicorn main:app --reload
   ```
   
   In another terminal (frontend):
   ```bash
   cd client
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

For more detailed instructions, including environment setup and configuration, please refer to the [Getting Started Guide](./GETTING-STARTED.md).

## 🎯 Key Features

### 🔍 Research & Analysis
- **AI-Powered Research** - Leverage advanced AI to conduct comprehensive research
- **Multi-Source Integration** - Seamlessly work with web content and custom text inputs
  - *Planned*: Document processing (PDF, DOCX, PPTX) for future implementation
- **Advanced Analytics** - Gain deeper insights with intelligent data processing and visualization
- **Semantic Search** - Find exactly what you need with AI-powered semantic search across all your research

#### 🛠️ Intelligent Tools
- **Smart Summarization** - Generate concise, well-structured research analyses using advanced AI agents
- **Interactive Q&A** - Chat with your research materials using natural language queries
- **Audio Overviews** - Listen to AI-generated podcast-style summaries with natural-sounding voices
- **Automated FAQ Generation** - Automatically create relevant FAQs from your research content
- **Visual Mindmaps** - Generate interactive, hierarchical mindmaps to visualize research structure

#### 📊 Presentation & Collaboration
- **Professional Reporting** - Generate beautiful, formatted reports with automated layouts
- **Team Workspaces** - Collaborate in real-time with team members on research projects
- **Presentation Mode** - Turn research into beautiful presentations with one click
- **Export Options** - Export your work in multiple formats (PDF, DOCX, Markdown)

#### 🌐 Global Web Access** - Bypass geo-restrictions and bot detection using Bright Data's infrastructure
  - *Note*: Future integration with Firecrawl is planned to provide additional web crawling options

### 🔍 Detailed Feature Overview

#### 🔍 How ResearchForge Works

#### 🤖 AI-Powered Research Analysis
ResearchForge employs advanced AI agents to transform how you conduct research. Our system intelligently processes and synthesizes information from multiple sources, identifying key insights, trends, and connections that might otherwise be missed. The platform's AI understands context, extracts meaningful patterns, and presents information in a clear, actionable format.

**🔍 Intelligent Content Processing**
- Extracts key information from web content and text inputs
  - *Planned*: Future support for automated extraction from document formats
- Identifies and connects related concepts across different sources
- Generates structured data from unstructured text
- Supports multiple languages and technical domains

**💬 Smart Q&A System**
Ask questions in natural language and get precise answers drawn from your research materials. Our system understands context and can provide detailed explanations, making it easy to explore complex topics without manual searching.

- **Context-Aware Responses** - Answers are grounded in your specific research context
- **Citation Tracking** - See exactly which sources support each answer
- **Follow-up Questions** - Ask follow-up questions to explore topics in depth
- **Technical Understanding** - Comprehends specialized terminology and concepts

**📊 Data Visualization & Reporting**
Transform your research into beautiful, insightful visualizations and reports with just a few clicks. Choose from multiple templates and customize the output to match your needs.

**🎧 Audio Overviews**
Transform your research into engaging, digestible audio content. Our advanced text-to-speech system creates natural-sounding audio summaries that you can listen to on the go, making it easy to absorb information during your commute or workout.

**❓ Smart FAQ Generation**
Automatically generates relevant questions and answers from your research content. The system identifies key concepts and formulates insightful questions with accurate, well-cited answers, helping you quickly grasp the main points of complex topics.

**🧠 Visual Mindmaps**
Turn complex research into clear, interactive mindmaps that reveal connections between ideas. Our AI analyzes your content to identify main topics and their relationships, creating a visual representation that enhances understanding and recall.

**🌐 Global Web Access**
Powered by advanced web crawling technology, ResearchForge can access and process content from around the world, ensuring comprehensive research coverage without geographical limitations.

## 🏗️ Technical Architecture

ResearchForge is built on a modern, scalable architecture that leverages cutting-edge technologies:

### Frontend
- **Next.js 15** - High-performance React framework with server components
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - Beautiful, accessible, and customizable components
- **React Query** - Powerful data synchronization and state management
- **Zod** - TypeScript-first schema validation with static type inference

### Backend
- **FastAPI** - High-performance Python framework for building APIs
- **Python 3.12** - Latest Python version with improved performance
- **SQLModel** - SQL databases in Python with Pydantic and SQLAlchemy
- **PostgreSQL** - Robust, open-source relational database
- **Qdrant** - High-performance vector search engine for AI applications
- **Firecrawl** - Advanced web crawling and data extraction

### AI & ML
- **OpenAI API** - State-of-the-art language models
- **LemonFox TTS** - Natural-sounding text-to-speech
- **Hugging Face** - Open-source models and datasets
- **LangChain** - Framework for building LLM applications

### Infrastructure
- **Docker** - Containerization for consistent environments
- **Docker Compose** - Multi-container application management
- **Nginx** - High-performance web server and reverse proxy
- **GitHub Actions** - Automated CI/CD pipelines
- **Vercel** - Cloud platform for frontend deployment
- **Railway** - Modern application hosting platform
- **Qdrant Cloud** - Managed vector database service

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ and pnpm
- Python 3.12
- OpenAI API key
- Qdrant Cloud API key (or local Qdrant instance)
- LemonFox API key (for text-to-speech)
- Web crawling service credentials
- OAuth credentials for authentication

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/researchforge.git
   cd researchforge
   ```

2. **Set up environment variables**

   Copy and configure the environment files:

   ```bash
   cp .env.example .env
   cp client/.env.example client/.env.local
   ```
   Update the files with your API keys and configuration.

3. **Start the application**

   ```bash
   # Start all services
   docker-compose up -d
   ```

4. **Access the application**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 🤖 AI-Powered Features

ResearchForge leverages multiple AI models and techniques to enhance your research:

- **Content Analysis** - Extract key information and identify patterns
- **Semantic Search** - Find relevant content using natural language
- **Automated Summarization** - Generate concise overviews of complex topics
- **Question Answering** - Get precise answers from your research materials
- **Data Visualization** - Transform data into insightful charts and graphs
- **Document Processing** - Extract text and data from various file formats

---

## 🏗️ Architecture

ResearchForge maintains the core architecture of DecipherIt while adding new components for enhanced functionality. The system includes additional modules for advanced web crawling, PDF generation, and AI-powered analysis, making it a comprehensive research platform.

---
---

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - Latest React with concurrent features
- **[TypeScript 5](https://typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Radix UI](https://radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Better Auth](https://better-auth.com/)** - Modern authentication solution
- **[Prisma](https://prisma.io/)** - Type-safe database ORM
- **[react-mindmap-visualiser](https://www.npmjs.com/package/react-mindmap-visualiser)** - Interactive mindmap visualization component
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

### Backend

- **[Python 3.12](https://python.org/)** - Latest Python with performance improvements
- **[FastAPI](https://fastapi.tiangolo.com/)** - High-performance async API framework
- **[CrewAI](https://crewai.com/)** - Multi-agent AI framework for complex tasks
- **[Qdrant](https://qdrant.tech/)** - Vector database for semantic search
- **[SQLAlchemy](https://sqlalchemy.org/)** - Python SQL toolkit and ORM
- **[Pydantic](https://pydantic.dev/)** - Data validation using Python type hints
- **[Loguru](https://loguru.readthedocs.io/)** - Simplified logging for Python
- **[uv](https://docs.astral.sh/uv/getting-started/installation/)** - Fast, disk space efficient package manager

### AI & ML Services

- **[Bright Data MCP Server](https://github.com/brightdata-com/brightdata-mcp)** - Official Model Context Protocol server for real-time web access, bypassing geo-restrictions and bot detection
- **[Google Gemini using OpenRouter](https://openrouter.ai/models/google/gemini-1.5-flash)** - Large language models for content generation
- **[OpenAI Embeddings](https://openai.com/)** - Text embeddings for semantic search
- **[LemonFox TTS](https://lemonfox.ai/)** - High-quality text-to-speech synthesis
- **[MarkItDown](https://github.com/microsoft/markitdown)** - Document conversion to Markdown

### Infrastructure & Storage

- **[Cloudflare R2](https://cloudflare.com/products/r2/)** - Object storage for files and audio
- **[PostgreSQL](https://postgresql.org/)** - Robust relational database
- **[Docker](https://docker.com/)** - Containerization for deployment

---

## 🚀 Installation

### Prerequisites

- **Node.js 20+** and **pnpm**
- **Python 3.12+** and **uv**
- **PostgreSQL 14+**
- **Docker** (optional, for containerized deployment)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/mtwn105/decipher-research-agent.git
   cd decipher-research-agent
   ```

2. **Set up the frontend**

   ```bash
   cd client
   pnpm install
   cp .env.example .env.local
   # Configure your environment variables
   pnpm prisma generate
   pnpm prisma migrate dev
   ```

3. **Set up the backend**

   ```bash
   cd ../backend
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   uv pip install -e .
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Start the development servers**

   ```bash
   # Terminal 1 - Frontend
   cd client && pnpm dev

   # Terminal 2 - Backend
   cd backend && python server.py
   ```

### 🌐 Bright Data MCP Server Setup

ResearchForge uses the official **[Bright Data MCP Server](https://github.com/brightdata-com/brightdata-mcp)** for advanced web scraping capabilities. Follow these steps to set it up:

#### 1. Get Your Bright Data Account

- Sign up at [brightdata.com](https://brightdata.com) (new users get free credits)
- Navigate to your user settings page to get your API token

#### 2. Configure Web Unlocker (Automatic)

- By default, ResearchForge creates a Web Unlocker zone automatically using your API token
- For custom control, create your own Web Unlocker zone in the Bright Data control panel

#### 3. Web Unlocker Zone (Optional)

- For advanced use cases, you can create a custom Web Unlocker zone in your Bright Data control panel
- This provides more control over proxy settings and usage limits

#### 4. Integration Implementation

**Official MCP Server Integration**:

```python
from mcp import StdioServerParameters
from crewai_tools import MCPServerAdapter

server_params = StdioServerParameters(
    command="pnpm",
    args=["dlx", "@brightdata/mcp"],
    env={
        "API_TOKEN": os.environ["BRIGHT_DATA_API_TOKEN"],
        "BROWSER_AUTH": os.environ["BRIGHT_DATA_BROWSER_AUTH"]
    },
)
```

**Multi-Agent Workflow**:

```python
# Execute multiple scraping tasks in parallel
web_scraping_tasks = []
for link in links:
    web_scraping_tasks.append(
        web_scraping_crew.kickoff_async(inputs={
            "url": link.url,
            "current_time": current_time,
        })
    )

web_scraping_results = await asyncio.gather(*web_scraping_tasks)
```

#### 5. Security Best Practices

⚠️ **Important**: Always treat scraped web content as untrusted data. ResearchForge automatically:

- Filters and validates all web data before processing
- Uses structured data extraction rather than raw text
- Implements rate limiting and error handling

### Environment Variables

#### Frontend (.env.local)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/decipher"
BETTER_AUTH_SECRET="your-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"
R2_ENDPOINT="https://your-account-id.r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID="your-r2-access-key"
R2_SECRET_ACCESS_KEY="your-r2-secret-key"
R2_BUCKET_NAME="decipher-files"
R2_PUBLIC_URL="https://files.researchforge.app"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

#### Backend (.env)

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/decipher"

# AI Services
OPENAI_API_KEY="your-openai-api-key"
OPENROUTER_API_KEY="your-openrouter-api-key"
LEMONFOX_API_KEY="your-lemonfox-api-key"

# Bright Data MCP Server
BRIGHT_DATA_API_TOKEN="your-bright-data-token"
BRIGHT_DATA_WEB_UNLOCKER_ZONE="your-web-unlocker-zone"  # Optional: custom zone name

# Vector Database
QDRANT_API_URL="http://localhost:6333"
QDRANT_API_KEY="your-qdrant-api-key"

# Cloud Storage
CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
CLOUDFLARE_R2_ACCESS_KEY_ID="your-r2-access-key"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="your-r2-secret-key"
```

---

## 🎯 Core Features

### 🔍 Intelligent Research Agents

ResearchForge employs specialized AI agents powered by **CrewAI** to handle different aspects of research:

#### CrewAI Crews Overview

ResearchForge employs a sophisticated multi-crew architecture powered by **CrewAI**:

- **Web Scraping Crew** - A crew of agents focused on data collection strategy and execution
- **Research Crew** - A crew dedicated to discovering and analyzing relevant sources using Bright Data
- **Content Processing Crew** - A crew that extracts and structures web content data
- **Analysis Crew** - A crew that synthesizes information from multiple research sources
- **Content Creation Crew** - A crew producing engaging, well-structured research summaries
- **FAQ Generation Crew** - A specialized crew generating relevant questions and answers
- **Visualization Crew** - A crew analyzing research to create hierarchical visual mindmaps

#### Individual Agent Roles

- **Web Scraping Planner** - Strategizes optimal data collection approaches
- **Link Collector Agent** - Uses `search_engine` to find relevant sources based on research topics
- **Web Scraper Agent** - Uses `scrape_as_markdown` to extract clean, structured content from discovered URLs
- **Research Analyst** - Synthesizes information from multiple sources
- **Content Writer** - Creates engaging, well-structured research summaries
- **FAQ Generator** - Automatically generates relevant questions and answers
- **Mindmap Creator** - Analyzes research content to create hierarchical visual mindmaps with up to 5 levels of depth

### 🌐 Advanced Web Scraping with Bright Data MCP

ResearchForge leverages the **[official Bright Data MCP Server](https://github.com/brightdata-com/brightdata-mcp)** - a powerful Model Context Protocol server that provides an all-in-one solution for public web access. This integration enables:

#### 🚀 Core Capabilities

- **Real-time Web Access** - Access up-to-date information directly from the web
- **Bypass Geo-restrictions** - Access content regardless of location constraints
- **Web Unlocker Technology** - Navigate websites with advanced bot detection protection
- **Browser Control** - Optional remote browser automation capabilities
- **Seamless Integration** - Works with all MCP-compatible AI assistants

#### 🛠️ Tools Used by ResearchForge

ResearchForge leverages two key tools from the Bright Data MCP server:

- `search_engine` - Search the web for relevant information and discover sources
- `scrape_as_markdown` - Extract and convert web content to clean, structured Markdown format

#### 🔒 Security & Reliability

- **Anti-Bot Detection** - Advanced techniques to avoid getting blocked
- **Residential Proxies** - Access content through real residential IP addresses
- **Rate Limiting** - Built-in protection against overuse
- **Data Validation** - Automatic filtering and validation of scraped content

This powerful integration allows ResearchForge's AI agents to conduct comprehensive research across the entire web without the typical limitations of traditional scraping methods.

### 🧠 Vector-Powered Search

Using **Qdrant vector database** and **OpenAI embeddings**:

- Semantic search through research content
- Intelligent content chunking for optimal retrieval
- Cross-reference information across multiple sources
- Context-aware question answering

### 🎧 AI-Generated Audio Overviews

Transform your research into engaging audio content:

- **LemonFox TTS** for high-quality voice synthesis
- Multiple AI voices for podcast-style conversations
- Automatic script generation from research content using **Podcast Script Generator** CrewAI agent
- Seamless audio file management with Cloudflare R2

#### How It Works

1. **Input Your Research Sources**: Enter any topic, upload documents, add custom URLs, or input manual text
2. **AI Planning**: The system creates a strategic research plan using specialized AI agents
3. **Web Discovery**: Bright Data's search engine finds relevant sources globally
4. **Intelligent Scraping**: Bright Data extracts content and converts it to clean markdown format
5. **AI Analysis**: Multiple AI agents analyze, synthesize, and create comprehensive summaries
6. **Multi-Format Output**: Get research summaries, FAQs, visual mindmaps, and podcast-style audio overviews

### 🧠 Interactive Visual Mindmaps

Transform complex research into visual hierarchical structures:

- **Intelligent Content Analysis** - AI agents analyze research to identify main themes and relationships
- **Hierarchical Structure Generation** - Creates up to 5 levels of depth based on content complexity
- **Interactive Visualization** - Built with react-mindmap-visualiser for smooth user experience
- **Adaptive Depth** - Automatically adjusts mindmap complexity based on research content richness
- **Real-time Generation** - Background processing with live status updates

#### AI Processing Pipeline

**Immediate Processing:**

- **Vector embeddings** created using OpenAI embeddings and stored in Qdrant for semantic search capabilities
- **Contextual analysis** by Research Analyst agents to synthesize information from multiple sources
- **Automatic FAQ generation** by analyzing content patterns and extracting key insights

**On-Demand Generation:**

- **Audio script creation** when users request podcast-style overviews, processed by specialized TTS agents
- **Mindmap structure analysis** for hierarchical visualization when users want visual representations
- **Interactive Q&A responses** powered by vector similarity search through processed content

### 📄 Document Processing

Comprehensive document support using **MarkItDown**:

- PDF, DOCX, PPTX, XLSX file processing
- Automatic text extraction and formatting
## 🐳 Docker Deployment

### Using Docker Compose

```yaml
version: "3.8"
services:
  frontend:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/researchforge
    depends_on:
      - db
      - backend

  backend:
    build: ./backend
    ports:
      - "8001:8001"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/researchforge
    depends_on:
      - db
      - qdrant

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=researchforge
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage

volumes:
  postgres_data:
  qdrant_data:
```

### Build and Run

```bash
docker-compose up -d
```

---

## 🏗️ Project Structure

```
researchforge/
├── client/                  # Next.js frontend application
│   ├── app/                # App router pages and layouts
│   ├── components/         # Reusable React components
│   ├── lib/                # Utility functions and hooks
│   └── public/             # Static assets and media files
├── server/                 # FastAPI backend services
│   ├── app/
│   │   ├── api/           # API endpoints and routes
│   │   ├── core/           # Core application logic
│   │   ├── models/         # Database and data models
│   │   └── services/       # Business logic and external services
│   └── tests/              # Backend test suite
├── docker/                 # Docker configuration files
├── docs/                   # Project documentation
└── scripts/                # Development and deployment scripts
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Push your code to a GitHub/GitLab repository
2. Import the repository to Vercel
3. Configure environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   NEXT_PUBLIC_APP_ENV=production
   # Add other required environment variables
   ```

### Backend Deployment (Railway/Heroku)
1. Connect your repository to your preferred platform
2. Set up required services:
   - PostgreSQL database
   - Qdrant vector database
   - Redis (for caching and job queues)
3. Configure environment variables
4. Set up SSL/TLS certificates

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help improve ResearchForge:

1. **Report Issues**
   - Check existing issues to avoid duplicates
   - Provide detailed reproduction steps
   - Include environment details and error logs

2. **Feature Requests**
   - Open an issue with the "enhancement" label
   - Explain the use case and benefits
   - Include any relevant examples or mockups

3. **Code Contributions**
   - Fork the repository
   - Create a feature branch: `git checkout -b feature/your-feature`
   - Follow our code style and commit guidelines
   - Write tests for new functionality
   - Update documentation as needed
   - Submit a pull request with a clear description

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

ResearchForge builds upon the work of many amazing open-source projects and communities:

- [DecipherIt](https://github.com/mtwn105/decipher-research-agent) - The original project by Amit Wani that inspired ResearchForge
- [CrewAI](https://www.crewai.com/) - Framework for orchestrating AI agents
- [OpenAI](https://openai.com/) - Advanced language models
- [Qdrant](https://qdrant.tech/) - Vector search engine
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [Next.js](https://nextjs.org/) - React framework for the web
- And all the other open-source projects that made this possible

---

<div align="center">
  <p>Made with ❤️ by the ResearchForge Team</p>
  <p>⭐ Star this repository if you find it helpful!</p>
  <p>👉 Follow us on Twitter: <a href="https://twitter.com/researchforge">@researchforge</a></p>

Originated from the original project by Amit Wani forked by Nangajui

</div>
