const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const colorSchema = new Schema(
  {
    color: String,
    color_code: String
  },
  { timestamps: true }
);

// Virtual id field
colorSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

colorSchema.set("toJSON", {
  virtuals: true
});

const Color = model("Color", colorSchema);

module.exports = { Color };
