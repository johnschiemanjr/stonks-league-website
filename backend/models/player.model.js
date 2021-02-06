const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slot: {
    type: String,
    required: true,
    trim: true,
  },
  eligibility: {
    type: [String],
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
