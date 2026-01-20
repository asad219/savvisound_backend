const mongoose = require('mongoose');
// Ensure Color model is registered for populate
require('./colorModel');
const { Schema, model } = mongoose;

const audioFileSchema = new Schema(
  {
    audioUrl: { type: String, required: true },
    colorId: { type: Schema.Types.ObjectId, ref: 'Color', required: true },
    isActive: { type: Boolean, default: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

// Virtual id field
audioFileSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

audioFileSchema.set('toJSON', {
  virtuals: true,
});

const AudioFile = model('AudioFile', audioFileSchema);

module.exports = { AudioFile };
