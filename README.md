# News Website CI/CD Project 🚀
**End-to-End DevOps Automation with AWS, Terraform, Jenkins, Docker, SonarQube & GitHub**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![AWS](https://img.shields.io/badge/AWS-EC2-orange)]()
[![Docker](https://img.shields.io/badge/Docker-containerized-blue)]()
[![Terraform](https://img.shields.io/badge/IaC-Terraform-purple)]()

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technologies Used](#technologies-used)
4. [How It Works](#how-it-works)
5. [Application Features](#application-features)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Infrastructure Setup](#infrastructure-setup)
8. [Security Best Practices](#security-best-practices)
9. [How to Run This Project](#how-to-run-this-project)
10. [Screenshots & Demos](#screenshots--demos)
11. [Why This Project Stands Out](#why-this-project-stands-out)

---

## 🎯 Project Overview

This is a **production-ready CI/CD pipeline** that automatically builds, tests, and deploys a **Node.js news aggregation website** on AWS cloud infrastructure.

**What makes this special:**
- Real AWS cloud infrastructure (not a local simulation)
- Fully automated pipeline from code push to live deployment
- Industry-standard tools and best practices
- Live news data integration using NewsAPI
- Complete DevOps lifecycle demonstration

**Perfect for:** Job interviews, portfolio projects, resume building, and learning real-world DevOps practices.

---

## 🏗️ Architecture

```
┌─────────────┐
│   GitHub    │ ◄─── Developer pushes code
└──────┬──────┘
       │ Webhook Trigger
       ▼
┌─────────────────┐
│  Jenkins (EC2)  │ ◄─── Orchestrates Pipeline
└────────┬────────┘
         │
    ┌────┴────┬─────────┬──────────┐
    ▼         ▼         ▼          ▼
┌────────┐ ┌──────┐ ┌──────┐ ┌─────────┐
│SonarQube│ │Docker│ │ AWS │ │Terraform│
│  (EC2) │ │(EC2) │ │ EC2 │ │  (IaC)  │
└────────┘ └──────┘ └──────┘ └─────────┘
```

### Infrastructure Components

| Component | Instance | Purpose |
|-----------|----------|---------|
| **Terraform** | EC2-1 | Infrastructure as Code - provisions all AWS resources |
| **Jenkins** | EC2-2 | CI/CD orchestration and automation |
| **Docker Host** | EC2-3 | Container runtime for application deployment |
| **SonarQube** | EC2-4 | Static code analysis and quality gates |

---

## 💻 Technologies Used

### DevOps & Cloud
- **AWS EC2** - Cloud compute instances
- **Terraform** - Infrastructure as Code (IaC)
- **Jenkins** - CI/CD automation server
- **Docker** - Container platform
- **SonarQube** - Code quality analysis
- **GitHub** - Version control and webhook triggers

### Application Stack
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **NewsAPI** - Live news data source
- **HTML/CSS/JavaScript** - Frontend

---

## 🔄 How It Works

### Simple Explanation (Layman's Terms)

1. **Developer makes changes** - You update code and push to GitHub
2. **GitHub notifies Jenkins** - A webhook automatically triggers the pipeline
3. **Code quality check** - SonarQube analyzes code for bugs, security issues, and code smells
4. **Build container** - Docker packages the application into a portable container
5. **Deploy automatically** - The new version goes live on the server
6. **Done!** - Your changes are live in minutes, not hours

### Technical Flow

```
GitHub Push 
    → Jenkins Webhook Trigger
    → SCM Checkout
    → SonarQube Static Analysis
    → Docker Image Build
    → Container Deployment
    → Health Check
    → Success/Failure Notification
```

---

## 🌐 Application Features

### News Website Functionality

The deployed application is a **real-time news aggregator** powered by NewsAPI:

**Key Features:**
- 🔍 **Search News** - Search by keywords, topics, or phrases
- 🌍 **Global Coverage** - News from 150,000+ sources in 55 countries
- 🗣️ **Multi-language** - Support for 14 languages
- 📅 **Date Filtering** - Search news by date range
- 🏷️ **Source Filtering** - Filter by specific domains or exclude sources
- ⚡ **Real-time Updates** - Always up-to-date with latest headlines

**How NewsAPI Integration Works:**

1. User requests news via web interface
2. Node.js backend receives request with search parameters
3. Server makes authenticated API call to NewsAPI
4. NewsAPI returns JSON data with articles
5. Backend formats and sends data to frontend
6. User sees latest news articles displayed

**Sample API Call:**
```javascript
// server.js
app.get('/api/news', async (req, res) => {
  const query = req.query.q || 'technology';
  const apiKey = process.env.NEWS_API_KEY;
  
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
    );
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 🔧 CI/CD Pipeline

### Jenkins Pipeline Stages



### Pipeline Execution Example



---

## 🏗️ Infrastructure Setup

### Terraform Structure

```
terraform/
├── ec2/
│   └── main.tf          # EC2 instance definitions
├── security_groups/
│   └── main.tf          # Firewall rules
├── keypair/
│   └── main.tf          # SSH key configuration
├── vpc/
│   └── main.tf          # Network setup
├── main.tf              # Root module
├── variables.tf         # Input variables
├── outputs.tf           # Output values
└── provider.tf          # AWS provider config
```

### Key Terraform Resources

- **4x EC2 instances** - Terraform, Jenkins, Docker, SonarQube
- **Security Groups** - Controlled ingress/egress rules
- **SSH Key Pairs** - Secure instance access
- **VPC Configuration** - Network isolation

### Deploy Infrastructure

```bash
# Initialize Terraform
terraform init

# Plan infrastructure changes
terraform plan

# Apply changes
terraform apply -auto-approve

# Destroy when done
terraform destroy
```

---

## 🔒 Security Best Practices

### Secrets Management

✅ **What We Do Right:**
- API keys stored in Jenkins credentials
- Environment variables for runtime secrets
- `.gitignore` prevents credential commits
- Docker images contain NO hardcoded secrets
- Secrets passed at container runtime only

❌ **What We Avoid:**
- No secrets in source code
- No secrets in Docker images
- No secrets in version control
- No plaintext credential storage

### Example - Secure Secret Usage

```bash
# Jenkins injects secret at runtime
docker run -d \
  --name news-website \
  -e NEWS_API_KEY="${NEWS_API_KEY}" \
  -p 3000:3000 \
  news-website:latest
```

### AWS Security

- Security groups restrict traffic to necessary ports only
- SSH access via key pairs (no passwords)
- Principle of least privilege for IAM roles

---

## 🚀 How to Run This Project

### Prerequisites

- AWS Account
- GitHub Account
- NewsAPI Account (free tier: https://newsapi.org)
- Basic knowledge of Linux/command line

### Step 1: Deploy Infrastructure

```bash
# Clone Terraform repo
git clone <terraform-repo-url>
cd terraform

# Configure AWS credentials
export AWS_ACCESS_KEY_ID="your-key"
export AWS_SECRET_ACCESS_KEY="your-secret"

# Deploy infrastructure
terraform init
terraform apply
```

### Step 2: Configure Jenkins

1. Access Jenkins at `http://<jenkins-ec2-ip>:8080`
2. Install plugins: Git, Docker, SonarQube Scanner, Pipeline
3. Add GitHub webhook: `http://<jenkins-ip>:8080/github-webhook/`
4. Create Jenkins credentials:
   - GitHub SSH key
   - NewsAPI key
   - Docker Hub credentials (optional)

### Step 3: Configure SonarQube

1. Access SonarQube at `http://<sonarqube-ec2-ip>:9000`
2. Create project with key: `news-website`
3. Generate authentication token
4. Add token to Jenkins SonarQube configuration

### Step 4: Setup Docker Host

```bash
# SSH into Docker EC2
ssh -i your-key.pem ubuntu@<docker-ec2-ip>

# Install Docker
sudo apt update
sudo apt install docker.io -y
sudo usermod -aG docker ubuntu

# Configure as Jenkins agent
```

### Step 5: Deploy Application

```bash
# Clone application repo
git clone <app-repo-url>
cd news-website

# Push to trigger pipeline
git add .
git commit -m "Initial deployment"
git push origin main
```

### Step 6: Access Your Website

```
http://<docker-ec2-ip>:3000
```

---

## 📸 Screenshots & Demos

### Add Your Own Screenshots

- Jenkins pipeline execution
- SonarQube analysis dashboard
- Docker container running
- Live news website
- Terraform apply output
- AWS EC2 console showing instances

---

## 🌟 Why This Project Stands Out

### For Recruiters

✅ **Real AWS deployment** - Not just a local lab
✅ **Production-ready practices** - Industry standard tools
✅ **Complete automation** - Zero manual deployment steps
✅ **Modern stack** - Latest DevOps technologies
✅ **Well documented** - Professional README and code comments
✅ **Live demo** - Actual working application
✅ **Cost-conscious** - Uses free tiers and minimal resources

### For Technical Reviewers

✅ **Infrastructure as Code** - Terraform best practices
✅ **CI/CD Pipeline** - Jenkins declarative pipeline
✅ **Code Quality** - SonarQube integration
✅ **Containerization** - Docker multi-stage builds
✅ **Security** - Proper secrets management
✅ **Monitoring** - Health checks and logging
✅ **Git Workflow** - Webhook-driven automation
✅ **API Integration** - Real external service (NewsAPI)

### Skills Demonstrated

| Category | Skills |
|----------|--------|
| **Cloud** | AWS EC2, VPC, Security Groups, IAM |
| **IaC** | Terraform, Infrastructure provisioning |
| **CI/CD** | Jenkins Pipeline, GitHub Webhooks, Automation |
| **Containers** | Docker, Image building, Container |
| **Code Quality** | SonarQube, Static analysis, Quality gates |
| **Backend** | Node.js, Express.js, REST API integration |
| **Frontend** | HTML, CSS, JavaScript |
| **Security** | Secrets management, Secure deployments |
| **Version Control** | Git, GitHub, Branching strategies |

---

## 📚 Project Structure

### Application Repository

```
news-website/
├── public/
│   ├── index.html      # Frontend UI
│   ├── styles.css      # Styling
│   └── script.js       # Client-side JS
├── server.js           # Node.js backend
├── package.json        # Dependencies
├── Dockerfile          # Container definition
├── Jenkinsfile         # Pipeline definition
└── .gitignore          # Excluded files
```

### Terraform Repository

```
terraform/
├── ec2/
├── security_groups/
├── keypair/
├── vpc/
├── main.tf
├── variables.tf
└── outputs.tf
```

---

## 🎓 What I Learned

- **Cloud Architecture** - Designing multi-instance AWS infrastructure
- **Automation** - End-to-end pipeline automation
- **DevOps Culture** - Collaboration between dev and ops
- **Container Technology** - Docker best practices
- **Code Quality** - Implementing quality gates
- **Infrastructure as Code** - Reproducible infrastructure
- **Security** - Secure credential handling
- **API Integration** - Working with external services
- **Problem Solving** - Debugging CI/CD issues


## 🔗 Links

- **GitHub Repo (App)**: https://github.com/vsanthoshraj/g3sha-news-website-node-js
- **GitHub Repo (Terraform)**: https://github.com/vsanthoshraj/<terraform-repo>
- **Docker Hub**: https://hub.docker.com/r/vsanthoshraj/news-website
- **NewsAPI**: https://newsapi.org

---

## 📞 Contact

**Santhosh Raj V ** - [LinkedIn](your-linkedin) | [Email](mailto:sksanthosh88409@gmail.com)
Chennai | 9566066846 

---


## 🙏 Acknowledgments

- NewsAPI for providing free news data
- Jenkins community for excellent CI/CD tools
- SonarSource for code quality platform
- Docker for containerization technology
- HashiCorp for Terraform



