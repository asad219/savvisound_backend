const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const journeySchema = new Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    needOtherOption: { type: Boolean, default: false },
    maximumOption: { type: Number, default: 1 },
    order: Number,
  },
  { timestamps: false }
);

// Virtual id field
journeySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

journeySchema.set("toJSON", {
  virtuals: true,
});

const Journey = model("Journey", journeySchema);

module.exports = { Journey };
