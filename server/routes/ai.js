const express = require('express');
const router = express.Router();
const { askGPT } = require('../controllers/aiCtrl');
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// Route: POST /api/ai
router.post('/', askGPT);

// Route: POST /api/ai/portfolio
router.post('/portfolio', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful investment assistant." },
        { role: "user", content: `Give me a portfolio for this request: ${prompt}. Include stock sectors and percentage allocation. Explain choices simply.` }
      ],
      temperature: 0.7
    });

    const portfolio = response.data.choices[0].message.content;
    res.json({ portfolio });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error generating portfolio" });
  }
});

module.exports = router;
