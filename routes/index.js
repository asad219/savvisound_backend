const express = require('express');
const userRoutes = require('./userRoutes');
const notificationSettingsRoutes = require('./notificationSettingsRoutes');
const quizRoutes = require('./quizRoutes');
const quizOptionRoutes = require('./quizOptionRoutes');
const audioFileRoutes = require('./audioFileRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const hydrationHistoryRoutes = require('./hydrationHistoryRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');
const journeyRoutes = require('./journeyRoutes');
const journeyOptionRoutes = require('./journeyOptionRoutes');
const audioCompletionRoutes = require('./audioCompletionRoutes');
const userJourneyResponseRoutes = require('./userJourneyResponseRoutes');
const quizResponseRoutes = require('./quizResponseRoutes');

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

// Mount hydration history routes
router.use('/hydration-history', hydrationHistoryRoutes);

// Mount subscription routes
router.use('/subscriptions', subscriptionRoutes);

// Mount journey routes
router.use('/journey', journeyRoutes);

// Mount journey option routes
router.use('/journey-option', journeyOptionRoutes);

// Mount audio completion routes
router.use('/audio-completions', audioCompletionRoutes);

// Mount user journey response routes
router.use('/user-journey-response', userJourneyResponseRoutes);

// Mount quiz response routes
router.use('/quizresponse', quizResponseRoutes);

module.exports = router;
