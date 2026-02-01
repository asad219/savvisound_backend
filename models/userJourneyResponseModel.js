const mongoose = require('mongoose');
// Ensure UserJourney and JourneyOption models are registered for populate
require('./userJourneyModel');
require('./journeyOptionModel');
const { Schema, model } = mongoose;

const userJourneyResponseSchema = new Schema(
  {
    journeyId: { type: Schema.Types.ObjectId, ref: 'UserJourney', required: true },
    journeyOptionId: { type: Schema.Types.ObjectId, ref: 'JourneyOption', required: true },
    value: { type: Number, required: true },
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
