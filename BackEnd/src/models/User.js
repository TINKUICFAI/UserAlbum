const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      default: "",
    },
    mobileNumber: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "email required!"],
    },
    password: {
      type: String,
      required: [true, "password required!"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      // enum: ["male", "female", "other"],
      default: "",
    },
    otp: {
      type: Number,
      default: null,
    },
    token: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

var User = mongoose.model("User", UserSchema);

module.exports = User;
