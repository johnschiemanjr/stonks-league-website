const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const seasonSummarySchema = new Schema(
  {
    year: {
      type: Number,
      required: true,
      unique: true,
    },
    regularSeasonChampionId: {
      type: Number,
      required: true,
    },
    playoffsChampionId: {
      type: Number,
      required: true,
      trim: true,
    },
    runnerUpId: {
      type: Number,
      required: true,
    },
    lastPlaceId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SeasonSummary = mongoose.model("SeasonSummary", seasonSummarySchema);

module.exports = SeasonSummary;
