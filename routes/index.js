const express = require('express');
const userRoutes = require('./userRoutes');
const notificationSettingsRoutes = require('./notificationSettingsRoutes');
const quizRoutes = require('./quizRoutes');
const quizOptionRoutes = require('./quizOptionRoutes');

const router = express.Router();

// Mount individual route modules
router.use('/users', userRoutes);

// Mount notification settings routes
router.use('/notification-settings', notificationSettingsRoutes);

// Mount quiz routes
router.use('/quiz', quizRoutes);

// Mount quiz option routes
router.use('/quiz-option', quizOptionRoutes);
module.exports = router;
