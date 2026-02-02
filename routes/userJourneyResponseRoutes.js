const express = require('express');
const router = express.Router();
const authLimiter = require('../middleware/rateLimitHandler');
const validateToken = require('../middleware/validateTokenHandler');
const {
  createUserJourneyResponse,
  getAllUserJourneyResponses,
  getUserJourneyResponsesByUser,
  getUserJourneyResponseById,
} = require('../controllers/userJourneyResponseController');
const requireOwnership = require('../middleware/requireOwnership');
const requireAdmin = require('../middleware/requireAdmin');

// save user journey response
router.post('/', authLimiter, validateToken, createUserJourneyResponse);

// get all user journey responses (admin only)
router.get('/', authLimiter, validateToken, requireAdmin, getAllUserJourneyResponses);

// get user journey response by ID (admin only)
router.get('/id/:id', authLimiter, validateToken, requireAdmin, getUserJourneyResponseById);

// get user journey responses by user
router.get('/:userId', authLimiter, validateToken, requireOwnership(), getUserJourneyResponsesByUser);

module.exports = router;
