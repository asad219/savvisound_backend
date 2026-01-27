const express = require('express');
const {
    getScheduleById,
    getAllSchedulesByUser,
    createSchedule,
    updateSchedule,
    createDefaultSchedules
} = require('../controllers/scheduleController');
const validateToken = require('../middleware/validateTokenHandler');
const authLimiter = require('../middleware/rateLimitHandler');
const {validateObjectId} = require('../middleware/validationObjectIdHandler');

const router = express.Router();

// GET /api/v2/schedules/:id
router.get('/:id', validateObjectId, validateToken, getScheduleById);

// GET /api/v2/schedules/user/:userId
router.get('/user/:userId', validateObjectId, validateToken, getAllSchedulesByUser);

// POST /api/v2/schedules/create
router.post('/create', authLimiter, validateToken, createSchedule);

// POST /api/v2/schedules/defaults
// Create default recurring schedules for full week at 06:30 and 21:00
router.post('/defaults', authLimiter, validateToken, createDefaultSchedules);

// PUT /api/v2/schedules/:id
router.put('/:id', validateObjectId, validateToken, updateSchedule);

// No need to delete schedule, just set isDeleted to true and use put endpoint to update the schedule
// DELETE /api/v2/schedules/:id
// router.put('/delete/:id', validateObjectId, validateToken, deleteSchedule);

module.exports = router;
