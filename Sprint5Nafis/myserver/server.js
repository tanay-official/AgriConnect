const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // ✅ Allows frontend at :3000 to access backend
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/agriconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Debug logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/checkout', require('./route/checkout'));
app.use('/api/invoice', require('./route/invoice'));

app.get('/', (req, res) => {
  res.send('AgriConnect Backend Running');
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});


