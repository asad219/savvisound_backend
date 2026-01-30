const express = require('express');
const asyncHandler = require('express-async-handler');
const { JourneyOption } = require('../models/journeyOptionModel');
const { parseJourneyOptionCreate, parseJourneyOptionUpdate } = require('../validators/journeyOption.zod');
const router = express.Router();

//get all journey options
const getAllJourneyOptions = asyncHandler(async (req, res) => {
    const journeyOptions = await JourneyOption.find({journeyId: req.params.journeyId})
        .select('_id journeyId option createdAt updatedAt')
        .populate('journeyId', 'title description');
    res.status(200).json({
        success: true,
        journeyOptions,
    });
});

//create journey option by admin
const createJourneyOption = asyncHandler(async (req, res) => {
    const validatedData = parseJourneyOptionCreate(req.body);
    const journeyOption = new JourneyOption(validatedData);
    const savedJourneyOption = await journeyOption.save();
    res.status(201).json({
        success: true,
        message: 'Journey option created successfully',
        journeyOption: savedJourneyOption,
    });
});

//update journey option by admin
const updateJourneyOption = asyncHandler(async (req, res) => {
    const { journeyOptionId } = req.params;
    const validatedData = parseJourneyOptionUpdate(req.body);
    const updatedJourneyOption = await JourneyOption.findByIdAndUpdate(journeyOptionId, validatedData, { new: true });
    res.status(200).json({
        success: true,
        message: 'Journey option updated successfully',
        journeyOption: updatedJourneyOption,
    });
});

module.exports = {
    getAllJourneyOptions,
    createJourneyOption,
    updateJourneyOption,
};