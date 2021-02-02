const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ownerSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        teamName: {
            type: String,
            required: true,
            trim: true,
        },
        espnId: {
            type: String,
            required: true,
            trim: true,
        },
        ownerName: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
