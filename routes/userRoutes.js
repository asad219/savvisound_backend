const express = require('express');
const {getUserById, registerUser, loginUser} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const authLimiter = require('../middleware/rateLimitHandler');
const { validateObjectId } = require('../middleware/validationObjectIdHandler');

const router = express.Router();

// GET /api/v2/users/:userId
router.get('/:userId', validateObjectId, validateToken, getUserById);

// POST /api/v2/users/register
router.post('/register', authLimiter, registerUser);

// POST /api/v2/users/login
router.post('/login', authLimiter, loginUser);

// Export the router
module.exports = router;