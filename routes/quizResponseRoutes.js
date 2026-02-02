const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');
const authLimiter = require('../middleware/rateLimitHandler');
const requireAdmin = require('../middleware/requireAdmin');
const {
    createQuizResponse,
    getQuizResponseByUserId,
    getAllQuizResponses
} = require('../controllers/quizResponseController');
const requireOwnership = require('../middleware/requireOwnership');

// Route to create a new quiz response
router.post('/', authLimiter, validateToken, createQuizResponse);

// Route to get quiz response by userId
router.get('/user/:userId', authLimiter, validateToken, requireOwnership(), getQuizResponseByUserId);

// Route to get all quiz responses (admin only)
router.get('/', authLimiter, validateToken, requireAdmin, getAllQuizResponses);

module.exports = router;
