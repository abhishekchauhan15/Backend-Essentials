const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userOTPVerificationSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date
  },
  expiresAt: {
    type: Date
  }
});

const UserOTPVerification = mongoose.model(
  "UserOTPVerification",
  userOTPVerificationSchema
);

module.exports = UserOTPVerification;
