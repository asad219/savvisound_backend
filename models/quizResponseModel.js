const mongoose = require('mongoose');
require('./userModel');
require('./quizModel');
require('./quizOptionModel');
const {Schema, model} = mongoose;

const quizResponseSubSchema = new Schema({
    quizId: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    quizOptionId: {
        type: [Schema.Types.ObjectId],
        ref: 'QuizOption',
        required: true
    }
}, {_id: false});

const quizResponseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizDate: {
        type: Date,
        required: true
    },
    response: {
        type: [quizResponseSubSchema],
        required: true
    }
}, {timestamps: true});

// Virtual id field
quizResponseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

quizResponseSchema.set('toJSON', {virtuals: true});

const QuizResponse = model('QuizResponse', quizResponseSchema);

module.exports = {
    QuizResponse
};
