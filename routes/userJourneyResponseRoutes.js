const express = require('express');
const router = express.Router();
const authLimiter = require('../middleware/rateLimitHandler');
const validateToken = require('../middleware/validateTokenHandler');
const {
  createUserJourneyResponse,
  getUserJourneyResponsesByUser,
} = require('../controllers/userJourneyResponseController');
const requireOwnership = require('../middleware/requireOwnership');

// save user journey response
router.post('/', authLimiter, validateToken, createUserJourneyResponse);

// get user journey responses by user ID
router.get(
  '/:userId',
  authLimiter,
  validateToken,
  requireOwnership(),
  getUserJourneyResponsesByUser
);

module.exports = router;
