const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const glassSizeSchema = new Schema(
  {
    name: { type: String, required: true },
    volume: { type: Number, required: true },
    unit: { type: String, enum: ["oz", "ml"], required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Virtual id field
glassSizeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

glassSizeSchema.set("toJSON", {
  virtuals: true,
});

const GlassSize = model("GlassSize", glassSizeSchema);

module.exports = { GlassSize };
