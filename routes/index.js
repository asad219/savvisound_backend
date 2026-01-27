const express = require('express');
const userRoutes = require('./userRoutes');
const notificationSettingsRoutes = require('./notificationSettingsRoutes');
const quizRoutes = require('./quizRoutes');
const quizOptionRoutes = require('./quizOptionRoutes');
const audioFileRoutes = require('./audioFileRoutes');
const scheduleRoutes = require('./scheduleRoutes');

const router = express.Router();

// Mount user routes
router.use('/users', userRoutes);

// Mount notification settings routes
router.use('/notification-settings', notificationSettingsRoutes);

// Mount quiz routes
router.use('/quiz', quizRoutes);

// Mount quiz option routes
router.use('/quiz-option', quizOptionRoutes);

// Mount audio file routes
router.use('/audio-file', audioFileRoutes);

// Mount schedule routes
router.use('/schedule', scheduleRoutes);

module.exports = router;
