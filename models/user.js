const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  noOfRequests: {
    type: Number,
    default: 0,
  },
  userType:
  {
    type:Number,
    default:0
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
