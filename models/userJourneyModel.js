const mongoose = require('mongoose');
// Ensure User and Journey models are registered for populate
require('./userModel');
require('./journeyModel');
const { Schema, model } = mongoose;

const userJourneySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    journeyId: { type: Schema.Types.ObjectId, ref: 'Journey', required: true },
    journeyDate: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

// Virtual id field
userJourneySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userJourneySchema.set('toJSON', {
  virtuals: true,
});

const UserJourney = model('UserJourney', userJourneySchema);

module.exports = { UserJourney };
