const mongoose = require("mongoose");
// Ensure User, AudioFile, and Schedule models are registered for populate
require("./userModel");
require("./audioFileModel");
require("./scheduleModel");
const { Schema, model } = mongoose;

const audioCompletionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    audioId: { type: Schema.Types.ObjectId, ref: "AudioFile", required: true },
    date: { type: Date, required: true },
    scheduleId: { type: Schema.Types.ObjectId, ref: "Schedule", default: null },
    autorun: { type: Boolean, default: false },
  },
  { timestamps: false }
);

// Virtual id field
audioCompletionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

audioCompletionSchema.set("toJSON", {
  virtuals: true,
});

const AudioCompletion = model("AudioCompletion", audioCompletionSchema);

module.exports = { AudioCompletion };
