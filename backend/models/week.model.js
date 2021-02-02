const mongoose = require("mongoose");

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
    },
    {
        timestamps: true,
    }
);

const Week = mongoose.model("Week", weekSchema);

module.exports = Week;
