const express = require('express');
const { createQuiz, getAllQuizzes } = require('../controllers/quizController');
const validateToken = require('../middleware/validateTokenHandler');
const authLimiter = require('../middleware/rateLimitHandler');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// POST /api/v2/quiz/create
// create quiz by admin
router.post('/create', authLimiter, validateToken, requireAdmin, createQuiz);

// GET /api/v2/quiz/
// get all quizzes
router.get('/', getAllQuizzes);

module.exports = router;