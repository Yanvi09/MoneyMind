// aiRoutes.js

const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/quiz', async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `Generate 3 beginner-level multiple-choice questions (with 4 options and correct answer) for learning about ${topic}. Format like:
    Q1: ...
    a) ...
    b) ...
    c) ...
    d) ...
    Answer: ...`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });

    res.json({ quiz: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

module.exports = router;
