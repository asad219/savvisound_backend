const express = require('express');
const router = express.Router();
const { createHydrationHistory, getHydrationHistoryByUserId, deleteHydrationHistoryById } = require('../controllers/hydrationHistoryController');
const validateToken = require('../middleware/validateTokenHandler');
const authLimiter = require('../middleware/rateLimitHandler');
const { validateObjectId } = require('../middleware/validationObjectIdHandler');

// POST /api/v2/hydration-history/create
// create hydration history by user
router.post('/create', authLimiter, validateToken, createHydrationHistory);

// GET /api/v2/hydration-history/:userId
// get hydration history by user id
router.get('/:userId', validateObjectId, validateToken, getHydrationHistoryByUserId);

// DELETE /api/v2/hydration-history/:hydrationHistoryId
router.delete('/:hydrationHistoryId', validateObjectId, validateToken, deleteHydrationHistoryById);

module.exports = router;