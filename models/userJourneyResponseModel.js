const mongoose = require('mongoose');
require('./userModel');
require('./journeyModel');
require('./journeyOptionModel');
const { Schema, model } = mongoose;

const userJourneyResponseSubSchema = new Schema(
  {
    journeyId: { type: Schema.Types.ObjectId, ref: 'Journey', required: true },
    journeyOptionId: { type: Schema.Types.ObjectId, ref: 'JourneyOption', required: true },
    value: { type: Number, required: true },
  },
  { _id: false }
);

const userJourneyResponseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    journeyDate: { type: Date, required: true },
    response: { type: [userJourneyResponseSubSchema], required: true },
  },
  { timestamps: true }
);

// Virtual id field
userJourneyResponseSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userJourneyResponseSchema.set('toJSON', {
  virtuals: true,
});

const UserJourneyResponse = model('UserJourneyResponse', userJourneyResponseSchema);

module.exports = { UserJourneyResponse };
