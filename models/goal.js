const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  goalName: {
    required: true,
    type: String,
  },
  goalId: {
    required: true,
    type: String,
  },
  currentStreak: {
    required: true,
    type: Number,
  },
  maxStreak: {
    required: true,
    type: Number,
  },
  autoIncrement: {
    required: true,
    type: Boolean,
  },
  lastUpdated: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model("Goal", goalSchema);
