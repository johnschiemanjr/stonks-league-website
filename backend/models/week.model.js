const mongoose = require("mongoose");

let { BoxscoreSchema } = require("./boxscore.model.js").schema;
const Schema = mongoose.Schema;

const weekSchema = new Schema(
    {
        year: {
            type: Number,
            required: true,
        },
        weekId: {
            type: Number,
            required: true,
        },
        boxscores: {
            type: [BoxscoreSchema],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Week = mongoose.model("Week", weekSchema);

module.exports = Week;
