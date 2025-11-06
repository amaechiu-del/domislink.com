# 🛡️ DomisLink Enterprise AI Proctoring System

## Advanced NCAA-Compliant Online Exam Monitoring

### 🚀 Overview
DomisLink's Enterprise AI Proctoring System provides **200+ advanced monitoring signals** for secure, NCAA-compliant online aviation examinations. Built with cutting-edge AI technology and enterprise-grade architecture.

### ✨ Key Features

#### 🤖 Advanced AI Monitoring (200+ Signals)
- **Behavioral & Cognitive Patterns** (30 signals)
- **Eye Tracking & Gaze Analysis** (20 signals) 
- **Facial Expression Analysis** (20 signals)
- **Voice & Audio Analysis** (20 signals)
- **System & Network Monitoring** (10 signals)

#### 🏢 Enterprise Architecture
- **Microservices Design** - Scalable and fault-tolerant
- **Real-time Analytics** - Live monitoring dashboard
- **Docker Containerization** - Easy deployment and scaling
- **Redis Caching** - High-performance data handling
- **PostgreSQL** - Robust data persistence

#### 🛡️ NCAA Compliance
- Meets all Nigerian Civil Aviation Authority requirements
- Secure identity verification
- Continuous environment monitoring
- Comprehensive audit trails
- Tamper-proof recording

### 🏗️ System Architecture

```
DomisLink Proctoring Ecosystem
├── 🎯 Main Application (React/Next.js)
├── 🤖 AI Proctoring Service (Node.js + Python AI)
├── 📊 Monitoring Dashboard (React)
├── 🗄️  PostgreSQL Database
├── ⚡ Redis Cache
└── 🐳 Docker Containerization
```

### 🚀 Quick Start

#### Prerequisites
- Docker & Docker Compose
- 4GB RAM minimum
- Stable internet connection

#### Deployment
```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

#### Manual Deployment
```bash
# Build and start services
docker-compose up -d --build

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

### 📊 Services & Ports

| Service | Port | Description |
|---------|------|-------------|
| Main App | 3000 | DomisLink examination platform |
| Monitoring | 3001 | Real-time proctoring dashboard |
| AI Service | 5001 | Advanced AI analysis engine |
| PostgreSQL | 5432 | Primary database |
| Redis | 6379 | Cache and session storage |

### 🔧 Configuration

#### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://postgres:password@domislink-db:5432/domislink

# Cache
REDIS_URL=redis://domislink-redis:6379

# AI Service
AI_PROCTORING_SERVICE=http://ai-proctoring:5001
```

#### NCAA Compliance Settings
- Enable continuous face monitoring
- Configure voice analysis thresholds
- Set behavioral pattern detection
- Define flag severity levels

### 🎯 Advanced Proctoring Signals

#### Behavioral Patterns (101-130)
- Unusual answering speed patterns
- Systematic guessing behavior  
- Inconsistent performance patterns
- Cognitive load anomalies
- Memory recall patterns

#### Eye Tracking (131-150)
- Saccadic eye movement patterns
- Fixation duration anomalies
- Gaze velocity variations
- Pupil dilation patterns
- Blink rate inconsistencies

#### Facial Analysis (151-170)
- Micro-expression flash patterns
- Emotional state inconsistencies
- Stress level fluctuations
- Confidence level variations
- Cognitive dissonance indicators

#### Voice Analysis (171-190)
- Vocal stress pattern analysis
- Speech rate inconsistencies
- Pitch variation anomalies
- Voice tremor detection
- Breathing pattern analysis

#### System Monitoring (191-200)
- Network latency patterns
- Bandwidth usage anomalies
- Process tree analysis
- Memory usage patterns
- CPU utilization anomalies

### 📈 Monitoring & Analytics

#### Real-time Dashboard
- Live session monitoring
- Risk score calculations
- Signal activity tracking
- System health metrics

#### Compliance Reporting
- NCAA compliance certificates
- Detailed audit trails
- Behavioral analytics
- Performance metrics

### 🔒 Security Features

- End-to-end encryption
- Secure media streaming
- Tamper-proof logging
- Access control systems
- Data protection compliance

### 🛠️ Development

#### Local Development
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Run tests
npm run test

# Build for production
npm run build
```

#### Adding New Signals
1. Update `ADVANCED_PROCTORING_SIGNALS` in AI service
2. Add signal analysis logic
3. Update monitoring dashboard
4. Run integration tests

### 📚 Documentation

- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)
- [NCAA Compliance](./docs/ncaa-compliance.md)
- [Troubleshooting](./docs/troubleshooting.md)

### 🆘 Support

For technical support or NCAA compliance questions:
- Email: support@domislink.com
- Phone: +2349049837474
- Documentation: https://docs.domislink.com

### 📄 License

DomisLink Enterprise AI Proctoring System - Proprietary Software
© 2024 DomisLink International Services, Ltd. All rights reserved.

---

**🛡️ DomisLink Aviation Academy - Setting New Standards in Secure Online Examination**



DomisLink A-BOS Migration & Zero-Click Deployment Handover
To: AI Web Developer / Deployment Specialist
From: Amaechi Ubadike, CEO, DomisLink International Business Services Limited, Lagos, Nigeria
Date: November 6, 2025
🚨 CRITICAL DECISION & ARCHITECTURAL SHIFT
Vercel has been fully deprecated and removed from the infrastructure plan due to its incompatibility with persistent, resource-heavy AI services (Ollama and ChromaDB).

The new architecture centers on Render, leveraging Docker and Infrastructure as Code (IaC) to guarantee zero-downtime, zero-click deployment, and resolve all previous merging/deployment ambiguity.

🎯 OVERALL MANDATE
Implement the full two-service architecture on Render.

Finalize the Dockerfile to run Ollama and the Python API simultaneously.

Ensure automated domain linkage for domislink.com.

Establish the Zero-Click CI/CD Pipeline.

📂 SECTION 1: CODEBASE & NEW FILES TO BE MERGED
The following Python files and folders contain the core A-BOS (Autonomous Business Operating System) logic and must be merged into the main deployment branch (likely main).

Component	Location	Summary of Content
Agents	agents/	Python files defining the CEO_Creator_Agent and Accounting_Agent using LangChain AgentExecutor with Ollama as the LLM.
Tools	tools/	Core Python APIs: accounting_api.py (Xero/QuickBooks), governance_api.py (Mobile MFA, Delegation), and rag/ (ChromaDB tools).
Prompts	prompts/	Markdown files (.md) containing the System Prompts and persona definitions (e.g., ceo_creator_persona.md).
RAG	rag/	Files for RAG (rag_retriever.py) and data ingestion (ingest_rag_data.py) which interact with the local ChromaDB.
Dependencies	requirements.txt	Must contain all Python packages: langchain, langchain-ollama, uvicorn, fastapi, chromadb, etc.
API Entry Point	app.py	The main Python file defining the FastAPI/Uvicorn endpoint that the public-facing service will call.

🛠️ SECTION 2: RENDER DEPLOYMENT & INFRASTRUCTURE AS CODE (IaC)
The deployment must be defined by the following two files. This eliminates ambiguity and manual configuration.

A. Render Blueprint (render.yaml)
This file must be placed in the root of the repository.

YAML

version: "1"

services:
  # 1. Private AI Agent Core (Runs Ollama/ChromaDB/Agents)
  - type: web
    name: ai-agent-core
    env: docker
    region: frankfurt # Preferred hosting region
    plan: standard # Guarantees persistent, non-sleeping service
    port: 8080 # Port exposed by Docker
    numInstances: 1
    
    envVars:
      - key: LLM_MODEL_NAME
        value: gpt-oss:20b
      - key: AI_CORE_HOST
        value: http://ai-agent-core:8080 # CRITICAL: Internal Network Link
      - key: SECRET_GOVERNANCE_TOKEN
        sync: false # Must be set securely in the Render dashboard

  # 2. Public Web & API Gateway (Serves Frontend, Proxies to Core)
  - type: web
    name: domislink-public
    env: node # Assuming Next.js/React frontend
    region: frankfurt
    plan: standard
    buildCommand: npm install && npm run build
    startCommand: npm start
    
    # AUTOMATED DOMAIN LINKAGE:
    customDomains:
      - domislink.com
      - www.domislink.com
      
    envVars:
      - key: PRIVATE_AI_ENDPOINT
        value: http://ai-agent-core:8080 # CRITICAL: Points to the private service
B. Dockerfile (Root of Project)
This must package the entire stack. The developer must use a multi-process launcher (like supervisord or a custom start.sh) to simultaneously run Ollama's API server and the Python Uvicorn server within the single ai-agent-core container.

Key Dockerfile Requirements:

Use a python:3.11-slim base image.

Install curl, git, and build tools.

Install and Pull Ollama Models: (nomic-embed-text, gpt-oss:20b). Set ENV OLLAMA_HOST=0.0.0.0.

Install uvicorn and fastapi.

Install a process supervisor (e.g., supervisor).

The final CMD must execute the script that starts both Ollama and Uvicorn.

🌐 SECTION 3: ZERO-CLICK CI/CD & CONNECTIVITY
A. Deployment Pipeline
The goal is achieved by linking the GitHub repository to Render with Auto Deploy enabled.

Trigger: The only action required from the CEO/developer is git push origin main.

Process: Render uses Blue/Green Deployment to build the new code alongside the old version. Only when the new service is fully healthy (zero errors) is traffic switched instantly, guaranteeing zero downtime.

B. Domain Linkage (domislink.com)
Render Action (Automatic): The customDomains in render.yaml automatically reserves the domain and issues the free SSL certificate.

Developer Action (One-Time): The developer must retrieve the Render Load Balancer IP Address from the Render Dashboard and update the DNS A Record for domislink.com at the domain registrar. Once this is done, the domain is permanently linked and updates automatically.

C. Integration Logic
The domislink-public service must be coded to forward user requests securely:

Frontend Request (Public): domislink.com/api/agent/command

Public Service Action: The Node.js/FastAPI on domislink-public receives the request and proxies it to the internal endpoint: http://ai-agent-core:8080/execute_agent

Agent Core Action (Private): The Python Uvicorn server executes the LangChain AgentExecutor using the local Ollama instance and returns the result.

This plan is definitive. There should be no ambiguity regarding Vercel, file structure, or deployment method.
