const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playoffPerformanceSchema = new Schema(
  {
    ownerId: {
      type: String,
      required: true,
      unique: true,
    },
    wins: {
      type: Number,
      required: true,
    },
    losses: {
      type: Number,
      required: true,
    },
    ties: {
      type: Number,
      required: true,
    },
    appearances: {
      type: Number,
      required: true,
    },
    championships: {
      type: Number,
      required: true,
    },
    runnerups: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PlayoffPerformance = mongoose.model(
  "PlayoffPerformance",
  playoffPerformanceSchema
);

module.exports = PlayoffPerformance;
