const express = require('express');
const { createQuizOption } = require('../controllers/quizOptionController');
const validateToken = require('../middleware/validateTokenHandler');
const authLimiter = require('../middleware/rateLimitHandler');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// POST /api/v2/quiz-options/create
// create quiz option by admin
router.post('/create', authLimiter, validateToken, requireAdmin, createQuizOption);

module.exports = router;
