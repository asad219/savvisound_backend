const express = require('express');
const router = express.Router();
const authLimiter = require('../middleware/rateLimitHandler');
const validateToken = require('../middleware/validateTokenHandler');
const {
  createAudioCompletion,
  getAllAudioCompletionsByUser,
} = require('../controllers/audioCompletionController');

// Route to create a new audio completion
router.post('/', authLimiter, validateToken, createAudioCompletion);

// Route to get all audio completions by user
router.get('/:userId', authLimiter, validateToken, getAllAudioCompletionsByUser);

module.exports = router;
