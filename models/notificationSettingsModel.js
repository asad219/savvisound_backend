const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const notificationSettingsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true
    },
    notificationStatus: {
      type: Boolean,
      default: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Virtual id field
notificationSettingsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

notificationSettingsSchema.set("toJSON", {
  virtuals: true
});

const NotificationSettings = model(
  "NotificationSettings",
  notificationSettingsSchema
);

module.exports = { NotificationSettings };
