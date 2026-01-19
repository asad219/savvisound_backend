const { Quiz } = require('../models/quizModel');
const { QuizOption } = require('../models/quizOptionModel');
const { parseQuizCreate, parseQuizUpdate } = require('../validators/quiz.zod');
const asyncHandler = require('express-async-handler');


//create quiz by admin
const createQuiz = asyncHandler(async (req, res) => {
    const validatedData = parseQuizCreate(req.body);
    const quiz = new Quiz(validatedData);
    const savedQuiz = await quiz.save();
    res.status(201).json({
        success: true,
        quiz: savedQuiz
    });
});

//get all quizzes with options and colors
const getAllQuizzes = asyncHandler(async (req, res) => {
    const quizzes = await Quiz.find()
        .select('-__v -createdAt -updatedAt _id')
        .sort({ order: 1 })
        .lean();

    const quizzesWithOptions = await Promise.all(quizzes.map(async (quiz) => {
        const options = await QuizOption.find({ quizId: quiz._id })
            .select('-__v -createdAt -updatedAt')
            .populate('colorId', 'color')
            .sort({ order: 1 })
            .lean();

        return {
            ...quiz,
            options
        };
    }));

    res.status(200).json({
        success: true,
        
        quizzes: quizzesWithOptions
    });
});




module.exports = {
    createQuiz,
    getAllQuizzes
};
