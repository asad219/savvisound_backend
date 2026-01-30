const express = require('express');

const { createJourney, updateJourney, getAllJourneys, getJourneyWithOptions } = require('../controllers/journeyController');
const validateToken = require('../middleware/validateTokenHandler');
const authLimiter = require('../middleware/rateLimitHandler');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// create journey by admin
router.post('/', authLimiter, validateToken, requireAdmin, createJourney);

// update journey by admin
router.put('/:journeyId', authLimiter, validateToken, requireAdmin, updateJourney);

// get all journeys
router.get('/', authLimiter, validateToken, getAllJourneys);

// get journey with options
router.get('/:journeyId', authLimiter, validateToken, getJourneyWithOptions);

module.exports = router;