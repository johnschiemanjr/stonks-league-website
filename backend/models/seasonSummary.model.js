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
    },
    runnerUpId: {
      type: Number,
      required: true,
    },
    lastPlaceId: {
      type: Number,
      required: true,
    },
    divisions: {
      type: [
        {
          id: {
            type: Number,
            required: true,
          },
          name: {
            type: String,
            required: true,
            trim: true,
          },
          size: {
            type: Number,
            required: false,
          },
        },
      ],
    },
    owners: {
      type: [
        {
          ownerId: {
            type: Number,
            required: true,
          },
          divisionId: {
            type: Number,
            required: true,
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
          divisionWins: {
            type: Number,
            required: true,
          },
          divisionLosses: {
            type: Number,
            required: true,
          },
          divisionTies: {
            type: Number,
            required: true,
          },
          pointsFor: {
            type: Number,
            required: true,
          },
          pointsAgainst: {
            type: Number,
            required: true,
          },
          seasonRank: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const SeasonSummary = mongoose.model("SeasonSummary", seasonSummarySchema);

module.exports = SeasonSummary;
