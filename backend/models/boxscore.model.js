const mongoose = require("mongoose");

const Player = require("./player.model.js").schema;
const Schema = mongoose.Schema;

const boxscoreSchema = new Schema({
  homeTeamId: {
    type: Number,
    required: true,
  },
  awayTeamId: {
    type: Number,
    required: true,
  },
  homeRoster: {
    type: [Schema.Types.ObjectId],
    ref: "Player",
  },
  awayRoster: {
    type: [Schema.Types.ObjectId],
    ref: "Player",
  },
});

const Boxscore = mongoose.model("Boxscore", boxscoreSchema);

module.exports = Boxscore;
