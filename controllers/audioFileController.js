const { AudioFile } = require('../models/audioFileModel');
const { parseAudioFileCreate, parseAudioFileUpdate } = require('../validators/audioFile.zod');
const asyncHandler = require('express-async-handler');

//create audio file by admin
const createAudioFile = asyncHandler(async (req, res) => {
  const validatedData = parseAudioFileCreate(req.body);
  const audioFile = new AudioFile(validatedData);
  const savedAudioFile = await audioFile.save();
  res.status(201).json({
    success: true,
    audioFile: savedAudioFile,
  });
});

//get all audio files by admin
const getAllAudioFilesByAdmin = asyncHandler(async (req, res) => {
  const audioFiles = await AudioFile.find();
  res.status(200).json({
    success: true,
    audioFiles: audioFiles.map((audioFile) => ({
      id: audioFile.id,
      name: audioFile.name,
      color: audioFile.colorId.color,
      isActive: audioFile.isActive,
      url: audioFile.audioUrl,
    })),
  });
});

//update audio file by admin
const updateAudioFileByAdmin = asyncHandler(async (req, res) => {
  const { audioFileId } = req.params;
  const validatedData = parseAudioFileUpdate(req.body);
  const audioFile = await AudioFile.findByIdAndUpdate(audioFileId, validatedData, { new: true });
  res.status(200).json({
    success: true,
    audioFile: audioFile,
  });

});

//get audio file by color id
const getAudioFileByColorId = asyncHandler(async (req, res) => {
  const { colorId } = req.params;
  const audioFile = await AudioFile.find({ colorId: colorId }).populate('colorId');
  res.status(200).json({
    success: true,
    audioFile: audioFile.map((audioFile) => ({
      id: audioFile.id,
      name: audioFile.name,
      color: audioFile.colorId.color,
      isActive: audioFile.isActive,
      url: audioFile.audioUrl,
    })),
  });
});


module.exports = {
  createAudioFile,
  getAllAudioFilesByAdmin,
  getAudioFileByColorId,
  updateAudioFileByAdmin,
};
