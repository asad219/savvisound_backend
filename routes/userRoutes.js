const express = require('express');
const {getUserById, registerUser, loginUser, updateUser} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const requireOwnership = require('../middleware/requireOwnership');
const authLimiter = require('../middleware/rateLimitHandler');
const { validateObjectId } = require('../middleware/validationObjectIdHandler');


const router = express.Router();

// GET /api/v2/users/:userId
router.get('/:userId', validateObjectId, validateToken, requireOwnership(), getUserById);

// POST /api/v2/users/register
router.post('/register', authLimiter, registerUser);

// POST /api/v2/users/login
router.post('/login', authLimiter, loginUser);

// PUT /api/v2/users/update/:userId
router.put('/update/:userId', validateObjectId, validateToken, requireOwnership(), updateUser);

// Export the router
module.exports = router;