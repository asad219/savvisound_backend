const express = require('express');
const asyncHandler = require('express-async-handler');
const {getAllJourneyOptions, createJourneyOption, updateJourneyOption} = require('../controllers/journeyOptionController');

const validateToken = require('../middleware/validateTokenHandler');
const authLimiter = require('../middleware/rateLimitHandler');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

//create journey option by admin
router.post('/', authLimiter, validateToken, requireAdmin, createJourneyOption);

//update journey option by admin
router.put('/:journeyOptionId', authLimiter, validateToken, requireAdmin, updateJourneyOption);

//get all journey options
router.get('/:journeyId', authLimiter, validateToken, getAllJourneyOptions);

module.exports = router;