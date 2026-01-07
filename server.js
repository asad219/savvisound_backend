const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample endpoint at /api/v2
app.get('/api/v2', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to SavviSound API v2',
    timestamp: new Date().toISOString()
  });
});

// Sample POST endpoint
app.post('/api/v2/data', (req, res) => {
  res.json({
    status: 'success',
    message: 'Data received',
    data: req.body
  });
});

// Health check endpoint
app.get('/api/v2/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '2.0.0'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Server configuration
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`SavviSound API v2 is running on port ${PORT}`);
});
