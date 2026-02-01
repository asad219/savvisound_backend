const express = require('express');
const router = express.Router();
const authLimiter = require('../middleware/rateLimitHandler');
const validateToken = require('../middleware/validateTokenHandler');
const requireAdmin = require('../middleware/requireAdmin');
const requireOwnership = require('../middleware/requireOwnership');

const { createUserJourney } = require('../controllers/userJourneyController');

// Route to create a new user journey by user
router.post('/', authLimiter, validateToken, createUserJourney);

module.exports = router;
