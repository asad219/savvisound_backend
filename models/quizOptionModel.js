const mongoose = require("mongoose");
// Ensure Color model is registered for populate
require('./colorModel');
const { Schema, model } = mongoose;

const quizOptionSchema = new Schema(
  {
    quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
    title: String,
    colorId: { type: Schema.Types.ObjectId, ref: "Color", required: true },
    order: Number
  },
  { timestamps: true }
);

// Virtual id field
quizOptionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

quizOptionSchema.set("toJSON", {
  virtuals: true
});

const QuizOption = model("QuizOption", quizOptionSchema);

module.exports = { QuizOption };
