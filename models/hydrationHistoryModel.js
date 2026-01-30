const mongoose = require("mongoose");
// Ensure User and GlassSize models are registered for populate
require("./userModel");
require("./glassSizeModel");
const { Schema, model } = mongoose;

const hydrationHistorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    quantity: { type: Number, default: 0 },
    unit: { type: String, enum: ["oz", "ml"] },
    glassSizeId: { type: Schema.Types.ObjectId, ref: "GlassSize", default: null },
  },
  { timestamps: true }
);

// Virtual id field
hydrationHistorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

hydrationHistorySchema.set("toJSON", {
  virtuals: true,
});

const HydrationHistory = model("HydrationHistory", hydrationHistorySchema);

module.exports = { HydrationHistory };
