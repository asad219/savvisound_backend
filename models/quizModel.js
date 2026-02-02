const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizSchema = new Schema(
  {
    title: String,
    order: Number,
    maxOptions: { type: Number, required: true }
  },
  { timestamps: true }
);

// Virtual id field
quizSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

quizSchema.set("toJSON", {
  virtuals: true
});

const Quiz = model("Quiz", quizSchema);

module.exports = { Quiz };
