const express = require('express');
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// JSON payload limit to 50MB
app.use(express.json({ limit: "50mb" }));

// Enable CORS pre-flight for all routes
app.options("*", cors());

// Load environment variables
const dotenv = require("dotenv").config();

// Connect to the database
const connectDb = require("./config/dbConnection");
connectDb();

// Centralized route registration
const routes = require('./routes');
app.use('/api/v2', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});


// Error handling middleware
app.use(errorHandler);

// Server configuration
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`SavviSound API v2 is running on port ${PORT}`);
});
