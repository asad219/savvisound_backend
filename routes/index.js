const express = require('express');
const userRoutes = require('./userRoutes');

const router = express.Router();

// Mount individual route modules
router.use('/users', userRoutes);

module.exports = router;
