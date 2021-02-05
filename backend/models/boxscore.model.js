const mongoose = require("mongoose");

let { Player } = require("./player.model.js").schema;
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
});

const Boxscore = mongoose.model("Boxscore", boxscoreSchema);

module.exports = Boxscore;
