const mongoose = require("mongoose");
// Ensure Journey model is registered for populate
require("./journeyModel");
const { Schema, model } = mongoose;

const journeyOptionSchema = new Schema(
  {
    journeyId: { type: Schema.Types.ObjectId, ref: "Journey", required: true },
    option: { type: String, required: true },
  },
  { timestamps: true }
);

// Virtual id field
journeyOptionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

journeyOptionSchema.set("toJSON", {
  virtuals: true,
});

const JourneyOption = model("JourneyOption", journeyOptionSchema);

module.exports = { JourneyOption };
