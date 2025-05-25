# 🔍 DecipherIt - AI-Powered Research Assistant

<div align="center">

![DecipherIt Logo](https://img.shields.io/badge/DecipherIt-AI%20Research%20Assistant-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+)

**Transform your research process with AI-powered intelligence**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.12-blue?style=flat-square&logo=python)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://typescriptlang.org/)

[🚀 Live Demo](https://decipherit.xyz) • [🛠️ Installation](#installation) • [🤝 Contributing](#contributing)

</div>

---

## ✨ Overview

DecipherIt is a cutting-edge AI-powered research assistant that revolutionizes how you explore, analyze, and synthesize information. Input any combination of documents, links, or topics, and watch as our intelligent agents transform your sources into comprehensive research notebooks with summaries, interactive Q&A, audio overviews, and automatically generated FAQs.

### 🎯 Key Features

- **🔬 Deep Research** - Conduct thorough research on any topic with AI-assisted analysis and synthesis
- **🔍 Multi-Source Research** - Seamlessly integrate documents, URLs, and manual text into unified research spaces
- **🤖 AI-Powered Summaries** - Generate comprehensive, well-structured research analyses using advanced AI agents
- **💬 Interactive Q&A** - Chat with your research materials using natural language queries
- **🎧 Audio Overviews** - AI-generated podcast-style audio summaries with multiple voices
- **❓ Smart FAQ Generation** - Automatically create relevant FAQs from your research content

---

## 🏗️ Architecture

DecipherIt follows a modern microservices architecture with a React frontend and Python backend, leveraging cutting-edge AI technologies:

```mermaid
graph TB
    A[Next.js Frontend] --> B[FastAPI Backend]

    subgraph CrewAI Agents
        C1[Chat Agent]
        C2[Topic Research Agent]
        C3[Sources Research Agent]
    end

    B --> C1
    B --> C2
    B --> C3
    B --> D[Qdrant Vector DB]
    B --> E[PostgreSQL]
    B --> F[Cloudflare R2]
    B --> H[LemonFox TTS]

    C1 --> D
    C1 --> I1[LLM]
    C2 --> G1[Bright Data MCP]
    C2 --> I2[LLM]
    C3 --> G2[Bright Data MCP]
    C3 --> I3[LLM]

    D --> J[OpenAI Embeddings]
```

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

- **[Bright Data MCP Server](https://brightdata.com/)** - Web scraping and data collection
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
R2_PUBLIC_URL="https://files.decipherit.xyz"
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

# Web Scraping
BRIGHT_DATA_API_TOKEN="your-bright-data-token"
BRIGHT_DATA_BROWSER_AUTH="your-browser-auth"

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

DecipherIt employs specialized AI agents powered by **CrewAI** to handle different aspects of research:

- **Web Scraping Planner** - Strategizes optimal data collection approaches
- **Link Collector** - Discovers relevant sources using Bright Data's search capabilities
- **Content Scraper** - Extracts and processes web content into structured data
- **Research Analyst** - Synthesizes information from multiple sources
- **Content Writer** - Creates engaging, well-structured research summaries
- **FAQ Generator** - Automatically generates relevant questions and answers

### 🌐 Advanced Web Scraping

Powered by **Bright Data's MCP Server**, DecipherIt can:

- Search the web for relevant information
- Extract content from any website
- Handle dynamic content and JavaScript-heavy sites

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
- Automatic script generation from research content using **Podcast Script Generator** crewai agent
- Seamless audio file management with Cloudflare R2

### 📄 Document Processing

Comprehensive document support using **MarkItDown**:

- PDF, DOCX, PPTX, XLSX file processing
- Automatic text extraction and formatting
- Secure file storage with Cloudflare R2
- Metadata preservation and indexing

---

## 🔧 API Documentation

### Research Endpoints

#### Start Research Task

```http
POST /research
Content-Type: application/json

{
  "topic": "Artificial Intelligence in Healthcare",
  "notebook_id": "uuid-string"
}
```

#### Chat with Research

```http
POST /chat/message
Content-Type: application/json

{
  "notebook_id": "uuid-string",
  "messages": [
    {
      "role": "user",
      "content": "What are the main benefits of AI in healthcare?"
    }
  ]
}
```

#### Generate Audio Overview

```http
POST /audio-overview/{notebook_id}
```

---

## 🏃‍♂️ Usage Examples

### 1. Topic-Based Research

```typescript
// Start research on a specific topic
const response = await fetch("/api/research", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    topic: "Quantum Computing Applications",
    notebook_id: "new-notebook-id",
  }),
});
```

### 2. Multi-Source Research

```typescript
// Upload documents and add URLs
const sources = [
  { type: "UPLOAD", file: pdfFile },
  { type: "URL", url: "https://example.com/article" },
  { type: "MANUAL", content: "Custom research notes..." },
];
```

### 3. Interactive Q&A

```typescript
// Chat with your research
const chatResponse = await fetch("/api/chat/message", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    notebook_id: "your-notebook-id",
    messages: [{ role: "user", content: "Summarize the key findings" }],
  }),
});
```

---

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
      - DATABASE_URL=postgresql://postgres:password@db:5432/decipher
    depends_on:
      - db
      - backend

  backend:
    build: ./backend
    ports:
      - "8001:8001"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/decipher
    depends_on:
      - db
      - qdrant

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=decipher
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

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- **Frontend**: ESLint + Prettier with TypeScript strict mode
- **Backend**: Black + isort + mypy for Python code quality
- **Commits**: Conventional Commits specification
- **Testing**: Minimum 80% code coverage

---

## 📈 Roadmap

### Q1 2025

- [ ] Real-time collaborative research
- [ ] Advanced visualization tools
- [ ] Mobile app development
- [ ] API rate limiting improvements

### Q2 2025

- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with academic databases
- [ ] Custom AI model fine-tuning

### Q3 2025

- [ ] Enterprise features
- [ ] Advanced export options
- [ ] Workflow automation
- [ ] Third-party integrations

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Created By

**Amit Wani**

- GitHub: [@mtwn105](https://github.com/mtwn105)
- LinkedIn: [Amit Wani](https://linkedin.com/in/mtwn105)
- Website: [linktr.ee/mtwn105](https://linktr.ee/mtwn105)

---

## 🙏 Acknowledgments

- **[Bright Data](https://brightdata.com/)** for powerful web scraping capabilities
- **[CrewAI](https://crewai.com/)** for the multi-agent AI framework
- **[Qdrant](https://qdrant.tech/)** for vector database technology
- **[LemonFox](https://lemonfox.ai/)** for high-quality TTS services
- **[Cloudflare](https://cloudflare.com/)** for R2 storage and CDN
- **[Vercel](https://vercel.com/)** for seamless deployment
- **[OpenAI](https://openai.com/)** for GPT and embedding models
- **[OpenRouter](https://openrouter.ai/)** for OpenRouter API for Gemini

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Amit Wani](https://github.com/mtwn105)

</div>
