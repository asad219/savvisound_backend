const mongoose = require('mongoose');
const {date} = require('zod');
// Ensure referenced models are registered
require('./userModel');
require('./audioFileModel');
const {Schema, model} = mongoose;

const scheduleSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    audioId: {
        type: Schema.Types.ObjectId,
        ref: 'AudioFile',
        required: true
    },
    type: {
        type: String,
        enum: ['recurring', 'once']
    },
    weekday: {
        type: String,
        enum: [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday'
        ]
    },
    date: {
        type: Date
    },
    time: {
        type: Date
    },
    hours: {
        type: Number
    },
    minutes: {
        type: Number
    },
    seconds: {
        type: Number
    },
    repeat: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {timestamps: true});

// Virtual id field
scheduleSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

scheduleSchema.set('toJSON', {virtuals: true});

const Schedule = model('Schedule', scheduleSchema);

module.exports = {
    Schedule
};
