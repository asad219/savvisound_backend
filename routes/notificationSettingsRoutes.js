const express = require('express');
const { getNotificationByUserId, createNotification, updateNotification } = require('../controllers/notificationController');
const validateToken = require('../middleware/validateTokenHandler');
const authLimiter = require('../middleware/rateLimitHandler');
const { validateObjectId } = require('../middleware/validationObjectIdHandler');

const router = express.Router();

// GET /api/v2/notification-settings/:userId
router.get('/:userId', validateObjectId, validateToken, getNotificationByUserId);

// POST /api/v2/notification-settings
router.post('/', authLimiter, validateToken, createNotification);

// PUT /api/v2/notification-settings/:userId
router.put('/:userId', validateObjectId, authLimiter, validateToken, updateNotification);

module.exports = router;