require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.NEWS_API_KEY;

if (!API_KEY) {
    console.error('ERROR: NEWS_API_KEY is not set!');
    process.exit(1);
}

console.log('API Key is configured!');

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Root route - serve HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', hasApiKey: !!API_KEY });
});

app.get('/api/news', async (req, res) => {
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
