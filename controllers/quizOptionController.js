const asyncHandler = require('express-async-handler');
const { QuizOption } = require('../models/quizOptionModel');
const { parseQuizOptionCreate, parseQuizOptionUpdate } = require('../validators/quizOption.zod');

//create quiz option by admin
const createQuizOption = asyncHandler(async (req, res) => {
    const validatedData = parseQuizOptionCreate(req.body);
    const quizOption = new QuizOption(validatedData);
    const savedQuizOption = await quizOption.save();
    res.status(201).json({
        success: true,
        message: 'Quiz option created successfully',
        quizOption: savedQuizOption
    });
});

module.exports = {
    createQuizOption
};