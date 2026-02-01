const { UserJourneyResponse } = require('../models/userJourneyResponseModel');
const { UserJourney } = require('../models/userJourneyModel');
const { parseUserJourneyResponseCreate } = require('../validators/userJourneyResponse.zod');
const asyncHandler = require('express-async-handler');

// Get all user journey responses (admin only)
const getAllUserJourneyResponses = asyncHandler(async (req, res) => {
  const responses = await UserJourneyResponse.find()
    .select('_id journeyId journeyOptionId value createdAt updatedAt')
    .populate({
      path: 'journeyId',
      model: UserJourney,
      select: '_id journeyDate',
    })
    .populate('journeyOptionId', '_id option')
    .lean();

  // Sort by journeyDate descending after population
  const sortedResponses = responses.sort((a, b) => {
    const dateA = a.journeyId?.journeyDate || new Date(0);
    const dateB = b.journeyId?.journeyDate || new Date(0);
    return new Date(dateB) - new Date(dateA);
  });

  res.status(200).json({
    success: true,
    userJourneyResponses: sortedResponses,
  });
});

// Create user journey responses by user (bulk insert)
const createUserJourneyResponse = asyncHandler(async (req, res) => {
  const dataArray = req.body;

  // Check if data is an array
  if (!Array.isArray(dataArray)) {
    res.status(400);
    throw new Error('Request body must be an array of objects');
  }

  // Check if array is empty
  if (dataArray.length === 0) {
    res.status(400);
    throw new Error('Request body cannot be an empty array');
  }

  // Validate and save each item
  const savedResponses = [];
  const errors = [];

  for (let i = 0; i < dataArray.length; i++) {
    try {
      const validatedData = parseUserJourneyResponseCreate(dataArray[i]);
      const userJourneyResponse = new UserJourneyResponse(validatedData);
      const savedResponse = await userJourneyResponse.save();
      savedResponses.push(savedResponse);
    } catch (error) {
      errors.push({
        index: i,
        data: dataArray[i],
        error: error.message,
      });
    }
  }

  // If all validations failed, return error
  if (savedResponses.length === 0 && errors.length > 0) {
    res.status(400);
    throw new Error(`All validations failed: ${JSON.stringify(errors)}`);
  }

  // Return response with saved data and any errors
  res.status(201).json({
    success: true,
    message: `Successfully saved ${savedResponses.length} out of ${dataArray.length} responses`,
    userJourneyResponses: savedResponses,
    ...(errors.length > 0 && { validationErrors: errors }),
  });
});

// Get all user journey responses by user ID
const getUserJourneyResponsesByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  console.log('Fetching responses for userId:', userId);

  // First get all user journeys for this user
  const userJourneys = await UserJourney.find({ userId: userId }).select('_id').lean();
  console.log('Found user journeys:', userJourneys.length);
  const journeyIds = userJourneys.map((j) => j._id);

  console.log('Journey IDs:', journeyIds);

  const ress = await UserJourneyResponse.find({ journeyId: { $in: journeyIds } });
  console.log('Found response', ress);

  const responses = await UserJourneyResponse.find({
    journeyId: { $in: '697d1a77d17f35d4c6f2345c' },
  })
    .select('_id journeyId journeyOptionId option value createdAt updatedAt')
    .populate({
      path: 'journeyId',
      model: UserJourney,
      select: '_id journeyDate',
    })
    .populate('journeyOptionId', '_id option')
    .lean();

  if (!responses || responses.length === 0) {
    return res.status(200).json({
      success: true,
      userJourneyResponses: [],
    });
  }

  // Sort by journeyDate descending after population
  const sortedResponses = responses.sort((a, b) => {
    const dateA = a.journeyId?.journeyDate || new Date(0);
    const dateB = b.journeyId?.journeyDate || new Date(0);
    return new Date(dateB) - new Date(dateA);
  });

  res.status(200).json({
    success: true,
    userJourneyResponses: sortedResponses,
  });
});

module.exports = {
  getAllUserJourneyResponses,
  createUserJourneyResponse,
  getUserJourneyResponsesByUser,
};
