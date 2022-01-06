const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ownerSchema = new Schema(
  {
    ownerId: {
      type: String,
      required: true,
      unique: true,
    },
    teamName: {
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
