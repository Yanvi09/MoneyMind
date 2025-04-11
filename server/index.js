// server/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use('/api/ai', require('./routes/aiRoutes')); // or './routes/ai' if that's the original file
app.use('/api/auth', require('./routes/auth'));
app.use('/api/plan', require('./routes/Plan'));

// 👋 Test route
app.get('/', (req, res) => {
  res.send('API Running...');
});

// 🌐 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB error:", err));

// 🚀 Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
