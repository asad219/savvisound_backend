const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const packageSchema = new Schema(
  {
    packageName: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: false }
);

// Virtual id field
packageSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

packageSchema.set("toJSON", {
  virtuals: true,
});

const Package = model("Package", packageSchema);

module.exports = { Package };
