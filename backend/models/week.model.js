const mongoose = require("mongoose");

const Boxscore = require("./boxscore.model.js");
const Schema = mongoose.Schema;

const weekSchema = new Schema(
    {
        year: {
            type: Number,
            required: true,
            unique: false,
        },
        weekId: {
            type: Number,
            required: true,
            unique: false,
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

weekSchema.index({ year: 1, weekId: 1 }, { unique: true });

const Week = mongoose.model("Week", weekSchema);

module.exports = Week;
