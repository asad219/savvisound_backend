const {UserJourneyResponse} = require('../models/userJourneyResponseModel');
const {parseUserJourneyResponseCreate} = require('../validators/userJourneyResponse.zod');
const {formatDateOnly} = require('../utils/dateTimeUtils');
const asyncHandler = require('express-async-handler');

// create user journey response
const createUserJourneyResponse = asyncHandler(async (req, res) => {
    const body = req.body;

    const validatedData = parseUserJourneyResponseCreate(body);

    try {
        const doc = new UserJourneyResponse({userId: validatedData.userId, journeyDate: validatedData.journeyDate, response: validatedData.response});
        const saved = await doc.save();
        res.status(201).json({
                success: true, message: `Successfully saved ${
                validatedData.response.length
            } responses`,
            userJourneyResponse: saved
        });
    } catch (error) {
        res.status(400);
        throw new Error(`Validation failed: ${
            error.message
        }`);
    }
});

// get all user journey responses (admin only)
const getAllUserJourneyResponses = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await UserJourneyResponse.countDocuments();
    const responses = await UserJourneyResponse.find().select('_id userId response').populate('userId', '_id firstName lastName email').populate('response.journeyId', '_id title').populate('response.journeyOptionId', '_id option').sort({createdAt: -1}).skip(skip).limit(limit).lean();

    const userJourneyResponses = responses.map((item) => ({
        ...item,
        response: item.response.map((resp) => ({
            ...resp,
            journeyDate: formatDateOnly(resp.journeyDate ? new Date(resp.journeyDate) : null)
        }))
    }));

    res.status(200).json({
        success: true,
        userJourneyResponses,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    });
});

// get user journey responses by user
const getUserJourneyResponsesByUser = asyncHandler(async (req, res) => {
    const {userId} = req.params;

    const year = req.query.year ? parseInt(req.query.year) : null;
    const month = req.query.month ? parseInt(req.query.month) : null;

    const responses = await UserJourneyResponse.find({
        userId: userId,
        $expr: {
            $and: [
                {
                    $eq: [
                        {
                            $year: "$journeyDate"
                        },
                        year
                    ]
                }, {
                    $eq: [
                        {
                            $month: "$journeyDate"
                        },
                        month
                    ]
                },
            ]
        }
    }).select('_id userId response').populate('userId', '_id firstName lastName email').populate('response.journeyId', '_id title').populate('response.journeyOptionId', '_id option').sort({createdAt: -1}).lean();

    const userJourneyResponses = responses.map((item) => ({
        ...item,
        response: item.response.map((resp) => ({
            ...resp,
            journeyDate: formatDateOnly(resp.journeyDate ? new Date(resp.journeyDate) : null)
        }))
    }));

    res.status(200).json({success: true, userJourneyResponses});
});

// get user journey response by ID (admin only)
const getUserJourneyResponseById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const response = await UserJourneyResponse.findById(id).select('_id userId journeyDate response').populate('userId', '_id firstName lastName email').populate('response.journeyId', '_id title').populate('response.journeyOptionId', '_id option').lean();

    if (! response) {
        res.status(404);
        throw new Error('User journey response not found');
    }

    const userJourneyResponse = {
        ... response,
        journeyDate: formatDateOnly(response.journeyDate ? new Date(response.journeyDate) : null)
    };

    res.status(200).json({success: true, userJourneyResponse});
});

module.exports = {
    createUserJourneyResponse,
    getAllUserJourneyResponses,
    getUserJourneyResponsesByUser,
    getUserJourneyResponseById
};
