const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const couponSchema = new Schema(
  {
    couponCode: { type: String, unique: true, required: true },
    description: String,
    discountType: { type: String, enum: ["fixed", "percentage"], required: true },
    discountValue: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    expiryDate: Date,
  },
  { timestamps: true }
);

// Virtual id field
couponSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

couponSchema.set("toJSON", {
  virtuals: true,
});

const Coupon = model("Coupon", couponSchema);

module.exports = { Coupon };
