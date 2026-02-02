const asyncHandler = require('express-async-handler');
const {QuizResponse} = require('../models/quizResponseModel');
const {parseQuizResponseCreate} = require('../validators/quizResponse.zod');
const {formatDateOnly} = require('../utils/dateTimeUtils');

// create quiz response by user
const createQuizResponse = asyncHandler(async (req, res) => {
    const validatedData = parseQuizResponseCreate(req.body);
    const quizResponse = new QuizResponse(validatedData);
    const savedQuizResponse = await quizResponse.save();
    res.status(201).json({success: true, quizResponse: savedQuizResponse});
});

// get quiz response by userId
const getQuizResponseByUserId = asyncHandler(async (req, res) => {
    const {userId} = req.params;

    const quizResponses = await QuizResponse.find({userId}).select('_id userId quizDate response createdAt updatedAt').populate('userId', '_id firstName lastName email').populate('response.quizId', '_id title order').populate('response.quizOptionId', '_id title').sort({createdAt: 1}).lean();

    if (!quizResponses || quizResponses.length === 0) {
        return res.status(200).json({success: true, quizResponses: []});
    }

    const formattedResponses = quizResponses.map((quizResponse) => ({
        ...quizResponse,
        id: quizResponse._id,
        quizDate: formatDateOnly(quizResponse.quizDate ? new Date(quizResponse.quizDate) : null),
        response: quizResponse.response
            .map((resp) => ({
                quizId: resp.quizId,
                quizOptionId: resp.quizOptionId.map((opt) => ({
                    _id: opt._id,
                    option: opt.title, // Map title to option
                })),
                order: resp.quizId?.order || 0 // Include order for sorting
            }))
            .sort((a, b) => (a.order || 0) - (b.order || 0)) // Sort by quiz order
            .map(({ order, ...rest }) => rest) // Remove order field from final output
    }));

    res.status(200).json({success: true, quizResponses: formattedResponses});
});

// get all quiz responses (admin only)
const getAllQuizResponses = asyncHandler(async (req, res) => {
    const quizResponses = await QuizResponse.find();
    res.status(200).json({success: true, quizResponses: quizResponses});
});

module.exports = {
    createQuizResponse,
    getQuizResponseByUserId,
    getAllQuizResponses
};
