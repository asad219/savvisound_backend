const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const authLimiter = require('../middleware/rateLimitHandler');
const requireAdmin = require('../middleware/requireAdmin');

const {
  createAudioFile,
  getAllAudioFilesByAdmin,
  getAudioFileByColorId,
  updateAudioFileByAdmin,
} = require('../controllers/audioFileController');

const router = express.Router();

// POST /api/v2/audio-file/create
// create audio file by admin
router.post('/create', authLimiter, validateToken, requireAdmin, createAudioFile);

// GET /api/v2/audio-file/get-all
// get all audio files by admin
router.get('/', authLimiter, validateToken, requireAdmin, getAllAudioFilesByAdmin);

// GET /api/v2/audio-file/get-by-color-id
// get audio file by color id
router.get('/:colorId', authLimiter, validateToken, getAudioFileByColorId);

// PUT /api/v2/audio-file/:audioFileId
// update audio file by admin
router.put('/:audioFileId', authLimiter, validateToken, requireAdmin, updateAudioFileByAdmin);

module.exports = router;