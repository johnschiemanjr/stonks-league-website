const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const boxscoreSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  homeTeamId: {
    type: String,
    required: true,
  },
  awayTeamId: {
    type: String,
    required: true,
  },
  playoffStatus: {
    type: String,
    required: false,
  },
  homeRoster: {
    type: [
      {
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
      },
    ],
  },
  awayRoster: {
    type: [
      {
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
      },
    ],
  },
});

const Boxscore = mongoose.model("Boxscore", boxscoreSchema);

module.exports = Boxscore;
