const express = require('express');
const {getUserById, registerUser, loginUser} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
// GET /api/v2/users/:id
router.get('/:id', validateToken, getUserById);

// POST /api/v2/users/register
router.post('/register', registerUser);

// POST /api/v2/users/login
router.post('/login', loginUser);

// Export the router
module.exports = router;