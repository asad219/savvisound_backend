const { UserJourney } = require('../models/userJourneyModel');
const { parseUserJourneyCreate, parseUserJourneyUpdate } = require('../validators/userJourney.zod');
const asyncHandler = require('express-async-handler');
const { formatDateOnly, formatTimeOnly } = require('../utils/dateTimeUtils');

// Get all user journeys by admin
const getAllUserJourneys = asyncHandler(async (req, res) => {
  const userJourneys = await UserJourney.find()
    .select('_id userId journeyId journeyDate notes createdAt updatedAt')
    .populate('userId', 'name email firstName lastName')
    .populate('journeyId', 'title description')
    .sort({ journeyDate: -1 })
    .lean();
  res.status(200).json({
    success: true,
    userJourneys,
  });
});

// Create user journey by user
const createUserJourney = asyncHandler(async (req, res) => {
  const validatedData = parseUserJourneyCreate(req.body);
  const userJourney = new UserJourney(validatedData);
  const savedUserJourney = await userJourney.save();
  res.status(201).json({
    success: true,
    userJourney: savedUserJourney,
  });
});

// Get all user journeys by user
const getAllUserJourneysByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const doc = await UserJourney.find({ userId: userId })
    .select('_id userId journeyId journeyDate notes createdAt')
    .populate('userId', 'name email firstName lastName')
    .populate('journeyId', 'title description')
    .sort({ journeyDate: -1 })
    .lean();
  if (!doc || doc.length === 0) {
    return res.status(200).json({
      success: true,
      userJourneys: [],
    });
  }
  const userJourneys = doc.map((item) => {
    const journeyDateStr = item.journeyDate != null ? formatDateOnly(item.journeyDate) : null;
    const journeyTimeStr = item.journeyDate != null ? formatTimeOnly(item.journeyDate) : null;
    const { userId, journeyId, journeyDate, ...rest } = item;
    return {
      ...rest,
      user: userId,
      journey: journeyId,
      journeyDate: journeyDateStr,
      journeyTime: journeyTimeStr,
    };
  });

  res.status(200).json({
    success: true,
    userJourneys: userJourneys,
  });
});

module.exports = {
  getAllUserJourneys,
  createUserJourney,
  getAllUserJourneysByUser,
};
