const mongoose = require("mongoose");

const Boxscore = require("./boxscore.model.js");
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
            type: [Schema.Types.ObjectId],
            ref: "Boxscore",
        },
    },
    {
        timestamps: true,
    }
);

const Week = mongoose.model("Week", weekSchema);

module.exports = Week;
