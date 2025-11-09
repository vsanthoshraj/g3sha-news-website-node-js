require('dotenv').config();  // Load .env file
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.NEWS_API_KEY;  // ⭐ Get API key from environment

// Check if API key is set
if (!API_KEY) {
    console.error('❌ ERROR: NEWS_API_KEY is not set!');
    process.exit(1);
}

console.log('✅ API Key is configured!');

// API endpoint to get news
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

