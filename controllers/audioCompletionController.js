const { AudioCompletion } = require('../models/audioCompletionModel');
const {
  parseAudioCompletionCreate,
  parseAudioCompletionUpdate,
} = require('../validators/audioCompletion.zod');
const { formatDateOnly, formatTimeOnly } = require('../utils/dateTimeUtils');
const asyncHandler = require('express-async-handler');

//create audio completion by user
const createAudioCompletion = asyncHandler(async (req, res) => {
  const validatedData = parseAudioCompletionCreate(req.body);
  const audioCompletion = new AudioCompletion(validatedData);
  const savedAudioCompletion = await audioCompletion.save();
  res.status(201).json({
    success: true,
    audioCompletion: savedAudioCompletion,
  });
});

//get all audio completions by user
const getAllAudioCompletionsByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const doc = await AudioCompletion.find({ userId: userId })
    .select('_id userId audioId date scheduleId autorun')
    .populate('userId', 'name email firstName lastName')
    .populate('audioId', 'name audioUrl')
    .lean();

  if (!doc || doc.length === 0) {
    return res.status(200).json({
      success: true,
      audioCompletions: [],
    });
  }
  const audioCompletions = doc.map((item) => {
    const completeDateStr = item.date != null ? formatDateOnly(item.date) : null;
    const completeTimeStr = item.date != null ? formatTimeOnly(item.date) : null;
    const { userId, audioId, date, ...rest } = item;
    return {
      ...rest,
      user: userId,
      audioFile: audioId,
      completedDate: completeDateStr,
      completedTime: completeTimeStr,
    };
  });

  res.status(200).json({
    success: true,
    audioCompletions: audioCompletions,
  });
});

module.exports = {
  createAudioCompletion,
  getAllAudioCompletionsByUser,
};
