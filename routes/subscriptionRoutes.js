const express = require('express')

const requireAdmin = require('../middleware/requireAdmin');
const authLimiter = require('../middleware/rateLimitHandler');
const validateToken = require('../middleware/validateTokenHandler');
const requireOwnership = require('../middleware/requireOwnership');

const { validateObjectId } = require('../middleware/validationObjectIdHandler');
const { getAllSubscriptions, createSubscription, getSubscriptionByUserId, updateSubscription, cancelSubscription } = require('../controllers/subscriptionController');

const router = express.Router();

// Get all subscriptions (admin only)
router.get('/', authLimiter, validateToken, requireAdmin, getAllSubscriptions);

// Create a new subscription (also it will use for renew, so no separate renew route)
router.post('/', validateToken, createSubscription);

// Get subscription by user ID
router.get('/:userId', validateToken, validateObjectId, requireOwnership(), getSubscriptionByUserId);

// Update subscription
router.put('/:id', validateToken, validateObjectId, updateSubscription);

// Cancel subscription
router.put('/cancel/:id', validateToken, validateObjectId, cancelSubscription);

module.exports = router;


