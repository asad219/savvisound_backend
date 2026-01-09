const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');

const router = express.Router();

/**
 * @route   GET /health
 * @desc    Health check endpoint for Docker/K8s readiness/liveness probes
 * @access  Public
 */
router.get('/', (req, res) => {
  // Check database connection status
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const isHealthy = mongoose.connection.readyState === 1;

  const healthData = {
    status: isHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    environment: config.env,
    version: '2.0.0',
    database: {
      status: dbStatus,
      readyState: mongoose.connection.readyState,
      name: mongoose.connection.name || 'N/A',
    },
    uptime: process.uptime(),
  };

  const statusCode = isHealthy ? 200 : 503;

  res.status(statusCode).json(healthData);
});

module.exports = router;
