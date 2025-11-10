# News Website 📰
**Real-Time News Aggregator powered by Node.js and NewsAPI**

[![Node.js](https://img.shields.io/badge/Node.js-v18-green)]()
[![Express](https://img.shields.io/badge/Express-Web%20Framework-blue)]()
[![NewsAPI](https://img.shields.io/badge/NewsAPI-Live%20Data-orange)]()
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue)]()
[![Live](https://img.shields.io/badge/Status-Live-brightgreen)]()

---

## 🚀 Quick Start

### Try It Yourself (No Setup Needed!)

```bash
# Pull the Docker image
docker pull vsanthoshraj/news-website:latest

# Run with your own NewsAPI key (get free key from newsapi.org)
docker run -d \
  -e NEWS_API_KEY=your_free_api_key_here \
  -p 3000:3000 \
  vsanthoshraj/news-website:latest

# Visit: http://localhost:3000
```

### Get Your NewsAPI Key

1. Go to [https://newsapi.org](https://newsapi.org)
2. Sign up (free tier available)
3. Get your API key
4. Use it above!

---

perview 
<img width="959" height="511" alt="image" src="https://github.com/user-attachments/assets/9198478e-5d96-4f7e-9544-82b9624b225d" />


## 📖 What This App Does

I built a **real-time news website** that shows the latest headlines from around the world.

**Features:**
- 🔍 Search news by keywords
- 🌍 News from 1000+ sources
- 📰 Latest headlines and articles
- 🌐 Global coverage in 55 countries
- 🗣️ Multiple language support in NewsAPI
- ⚡ Real-time updates

---

## 🏗️ How It Works

**Simple Explanation:**

1. You visit the website
2. You search for a topic (e.g., "artificial intelligence")
3. My backend asks NewsAPI for articles about that topic
4. NewsAPI sends back the latest articles
5. I display them on your screen

**Technical Flow:**

```
Frontend (Your Browser)
    ↓
User searches "bitcoin"
    ↓
Node.js Backend (server.js)
    ↓
Makes API call to NewsAPI
    ↓
NewsAPI returns JSON data
    ↓
Backend formats & sends to frontend
    ↓
Frontend displays articles
```

---

## 💻 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for routing
- **Axios** - HTTP client for API calls

### Frontend
- **HTML** - Structure
- **CSS** - Styling
- **JavaScript** - Interactivity

### API & Hosting
- **NewsAPI** - Live news data source
- **Docker** - Containerization
- **AWS/Jenkins** - CI/CD deployment

---

## 📁 Project Structure

```
news-website/
├── public/                    # Frontend files
│   ├── index.html            # Main webpage
│   ├── styles.css            # Styling
│   └── script.js             # Client-side logic
│
├── server.js                 # Backend entry point
├── package.json              # Node dependencies
├── package-lock.json         # Dependency lock
├── Dockerfile                # Container definition
├── Jenkinsfile               # CI/CD pipeline
├── .env.example              # Environment template
├── .gitignore                # Git exclusions
└── README.md                 # This file!
```

---

## 🎯 Key Features Explained


### 1. Real-Time Data
Articles update automatically:
- Latest news from 150,000+ sources
- Coverage in 55 countries
- 14 language support

### 2. Responsive Design
Works on:
- 💻 Desktop browsers
- 📱 Mobile phones
- 📱 Tablets

### 3. Secure API Key Handling
I never expose the API key:
- Stored in environment variables
- Never in source code
- Never in Docker image
- Injected at runtime only

---

## 🚀 Installation & Setup

### Local Development

**Prerequisites:**
- Node.js v18 or higher
- npm or yarn
- NewsAPI key (free from https://newsapi.org)

**Setup Steps:**

```bash
# 1. Clone the repository
git clone https://github.com/vsanthoshraj/g3sha-news-website-node-js.git
cd g3sha-news-website-node-js

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Add your NewsAPI key to .env
# Edit .env and add:
# NEWS_API_KEY=your_key_here
# PORT=3000

# 5. Start the server
npm start

# 6. Open browser
# Visit: http://localhost:3000
```

### With Docker Hub Image

```bash
# Build image locally
docker pull vsanthoshraj/news_website_without_env:latest

# Run container
docker run -d \
  -e NEWS_API_KEY=your_key_here \
  -p 3000:3000 \
  vsanthoshraj/news_website_without_env:latest
```


---

## 📋 Available Scripts

```bash
# Start development server
npm start

# Run with nodemon (auto-restart on changes)
npm run dev

# Start production server
npm run prod

# View all scripts
cat package.json
```

---

## 🔧 API Endpoints

### GET /api/news
Fetch news articles

**Query Parameters:**
- `q` (required) - Search query (default: "technology")
- `language` (optional) - Language code (en, es, fr, etc.)
- `sortBy` (optional) - Sort by (publishedAt, relevancy, popularity)

**Example Requests:**
```bash
# Search for AI news
GET /api/news?q=artificial%20intelligence

# Search in Spanish
GET /api/news?q=noticias&language=es

# Sort by popularity
GET /api/news?q=bitcoin&sortBy=popularity
```

## 🔒 Security

### How I Protect Your Data

✅ **API Key Security:**
- Never exposed in frontend
- Never committed to Git
- Only stored in `.env` file
- Injected at runtime

✅ **Code Security:**
- No secrets in source code
- `.gitignore` excludes sensitive files
- Environment variables for config
- Docker images have no hardcoded keys


---

## 🐳 Docker Deployment

### Docker Image Details

**What's Included:**
- Node.js runtime
- Express server
- All app dependencies
- Frontend files

**What's NOT Included:**
- API keys ✅ (kept secret!)
- Environment files
- Secrets of any kind

---

## 🚀 Deployment Options

### Option 1: Heroku
```bash
git push heroku main
```

### Option 2: AWS/EC2
```bash
docker run -d -e NEWS_API_KEY=key -p 3000:3000 image-name
```

### Option 3: Railway, Render, Vercel
Deploy the Docker image directly

### Option 4: Local Server
```bash
npm start
```

---

## 🐛 Troubleshooting

### "API key not found"
- Check `.env` file exists
- Verify `NEWS_API_KEY=` has correct value
- Restart server after editing `.env`

### "Port 3000 already in use"
```bash
# Use different port
PORT=3001 npm start

# Or kill existing process
lsof -i :3000
kill -9 <PID>
```

### "CORS errors"
- Verify NewsAPI endpoint is correct
- Check API key is valid
- Try in incognito mode

### "No articles showing"
- Verify internet connection
- Check NewsAPI quota (free tier has limits)
- Try different search term

---

## 📊 NewsAPI Limits (Free Tier)

- **Requests:** 100 per day
- **Articles:** Up to 100 per request
- **Data:** News from past 30 days
- **Update:** Real-time (articles updated constantly)

**For production:** Consider paid plans from NewsAPI

---


### Testing Locally

```bash
# Terminal 1 - Start server
npm start

# Terminal 2 - Test API
curl "http://localhost:3000/api/news?q=bitcoin"
```

---

## 📚 Dependencies

### Production
- **express** - Web framework
- **axios** - HTTP client
- **dotenv** - Environment variables

### Development
- **nodemon** - Auto-restart on changes

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.0",
    "dotenv": "^16.3.1"
  }
}
```

---

## 🔗 Links & Resources

- **GitHub Repo**: https://github.com/vsanthoshraj/g3sha-news-website-node-js
- **NewsAPI**: https://newsapi.org
- **Docker Hub**: https://hub.docker.com/r/vsanthoshraj/news-website

---

## 📖 How to Use This App

### For Users
1. Open website
2. Enter search term
3. Browse articles
4. Click to read full article

### For Developers
1. Clone repo
2. Install dependencies (`npm install`)
3. Add NewsAPI key to `.env`
4. Run server (`npm start`)
5. Customize as needed

### For DevOps/Docker Users
1. Pull image (`docker pull vsanthoshraj/news-website`)
2. Run with your API key
3. Deploy to your infrastructure

---

## 💡 How This Was Built

This app was built as part of a complete CI/CD project that includes:
- **Infrastructure:** AWS EC2 (Terraform)
- **CI/CD:** Jenkins automation
- **Quality:** SonarQube analysis
- **Container:** Docker deployment
- **Monitoring:** Email alerts

Learn more: [Main CI/CD Project README](https://github.com/vsanthoshraj/jenkins-CICD-News-Website-Deployment)

---

## 📝 Environment Variables

Create `.env` file:

```env
# Required
NEWS_API_KEY=your_newsapi_key_here

# Optional
PORT=3000
NODE_ENV=development
```

**Never commit `.env` to Git!**

---

## 🤝 Contributing

Want to improve this app?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push and create a Pull Request

**Ideas for enhancement:**
- Add trending topics
- Save favorite articles
- Add dark mode
- Add more filters
- Multi-language UI

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

## 📞 Contact & Support

**Creator:** Santhosh Raj V  
📧 Email: sksanthosh88409@gmail.com  
📱 Phone: 9566066846  
📍 Location: Chennai, India  
🔗 GitHub: [@vsanthoshraj](https://github.com/vsanthoshraj)

---

## 🙏 Credits

- **NewsAPI** - For providing free news data
- **Node.js Community** - For the runtime
- **Express.js** - For the web framework
- **Docker** - For containerization

---


---

## Quick Command Reference

```bash
# Install
npm install

# Development
npm start

# View logs
npm start | tail -f

# Stop server
Ctrl + C

# Docker build
docker build -t news-website:latest .

# Docker run
docker run -d -e NEWS_API_KEY=key -p 3000:3000 news-website:latest

# Docker stop
docker stop <container-id>

# Docker logs
docker logs <container-id>
```

