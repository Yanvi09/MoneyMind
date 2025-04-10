const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/ai', require('./routes/ai'));
app.use('/api/auth', require('./routes/auth'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB error:", err));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
