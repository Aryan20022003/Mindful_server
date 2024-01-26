const mongoose = require("mongoose");

const notSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    select: false,
  },
  tone: {
    type: [String],
    default: [],
  },
  title: {
    type: String,
    required: true,
  },
  thoughts: {
    type: String,
    require: true,
  },
  summary: {
    type: String,
  },
  actionable: {
    type: [String],
  },
  disclaimer: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

notSchema.pre("validate", function (next) {
  const currDate = new Date();
  this.month = currDate.getMonth() + 1;
  this.year = currDate.getFullYear();
  next();
});
const Note = mongoose.model("Note", notSchema);

module.exports = Note;
