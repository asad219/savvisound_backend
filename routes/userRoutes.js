const express = require('express');
const {getUserById, registerUser, loginUser} = require('../controllers/userController');

const router = express.Router();
// GET /api/v2/users/getUser/:id
router.get('/getUser/:id', getUserById);

// POST /api/v2/users/register
router.post('/register', registerUser);

// POST /api/v2/users/login
router.post('/login', loginUser);

// Export the router
module.exports = router;