const mongoose = require("mongoose");
// Ensure User, Package, and Coupon models are registered for populate
require("./userModel");
require("./packageModel");
require("./couponModel");
const { Schema, model } = mongoose;

const subscriptionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", unique: true, required: true },
    packageId: { type: Schema.Types.ObjectId, ref: "Package" },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    couponId: { type: Schema.Types.ObjectId, ref: "Coupon" },
    subscriptionStatus: { type: String, enum: ["active", "expired", "cancelled"] },
    paymentReference: { type: String },
    paymentDate: Date,
    expirationDate: Date,
    cancelDate: Date,
  },
  { timestamps: true }
);

// Virtual id field
subscriptionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

subscriptionSchema.set("toJSON", {
  virtuals: true,
});

const Subscription = model("Subscription", subscriptionSchema);

module.exports = { Subscription };
