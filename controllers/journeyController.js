const express = require('express');
const asyncHandler = require('express-async-handler');
const { Journey } = require('../models/journeyModel');
const { JourneyOption } = require('../models/journeyOptionModel');
const { parseJourneyCreate, parseJourneyUpdate } = require('../validators/journey.zod');

const router = express.Router();

//create journey by admin
const createJourney = asyncHandler(async (req, res) => {
    const validatedData = parseJourneyCreate(req.body);
    const journey = new Journey(validatedData);
    const savedJourney = await journey.save();
    res.status(201).json({
        success: true,
        message: 'Journey created successfully',
        journey: savedJourney,
    });
});

//update journey by admin
const updateJourney = asyncHandler(async (req, res) => {
    const { journeyId } = req.params;
    const validatedData = parseJourneyUpdate(req.body);
    const updatedJourney = await Journey.findByIdAndUpdate(journeyId, validatedData, { new: true });
    res.status(200).json({
        success: true,
        message: 'Journey updated successfully',
        journey: updatedJourney,
    });
});

//get all journeys
const getAllJourneys = asyncHandler(async (req, res) => {
    const journeys = await Journey.find()
        .select('_id title slug')
        .lean();
    res.status(200).json({
        success: true,
        journeys,
    });
});

//get journey with options
const getJourneyWithOptions = asyncHandler(async (req, res) => {
    const { journeyId } = req.params;
    const journey = await Journey.findById(journeyId)
        .select('_id title')
        .populate({
            path: 'journeyOptions',
            model: JourneyOption,
            select: '_id option',
        });
    if (!journey) {
        return res.status(404).json({
            success: false,
            message: 'Journey not found',
        });
    }
    res.status(200).json({
        success: true,
        journey,
    });

});

module.exports = {
    createJourney,
    updateJourney,
    getAllJourneys,
    getJourneyWithOptions,
};