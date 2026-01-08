const express = require('express');
const userRoutes = require('./userRoutes');
const notificationSettingsRoutes = require('./notificationSettingsRoutes');

const router = express.Router();

// Mount individual route modules
router.use('/users', userRoutes);

// Mount notification settings routes
router.use('/notification-settings', notificationSettingsRoutes);

module.exports = router;
