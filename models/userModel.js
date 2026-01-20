const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    passwordHash: String,
    name: String,
    firstName: String,
    lastName: String,
    phone: String,
    profilePicUrl: String,
    weight: Number,
    weightSymbol: String,
    customerId: { type: Schema.Types.ObjectId },
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz' },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    colorId: { type: Schema.Types.ObjectId, ref: 'Color' },
  },
  { timestamps: true }
);


userSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
userSchema.set('toJSON',{
    virtuals:true,
})

const User = model("User", userSchema);

module.exports = { User };