const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizSchema = new Schema(
  {
    title: String,
    slug: { type: String, unique: true, required: true },
    order: Number
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
