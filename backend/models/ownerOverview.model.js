const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ownerOverviewSchema = new Schema(
  {
    ownerId: {
      type: String,
      required: true,
      unique: true,
    },
    regWins: {
      type: Number,
      required: true,
    },
    regLosses: {
      type: Number,
      required: true,
    },
    regTies: {
      type: Number,
      required: true,
    },
    playoffWins: {
      type: Number,
      required: true,
    },
    playoffLosses: {
      type: Number,
      required: true,
    },
    playoffTies: {
      type: Number,
      required: true,
    },
    highScore: {
      score: {
        type: Number,
        required: true,
      },
      week: {
        type: Number,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      opposingTeam: {
        type: String,
        required: true,
      },
    },
    lowScore: {
      score: {
        type: Number,
        required: true,
      },
      week: {
        type: Number,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      opposingTeam: {
        type: String,
        required: true,
      },
    },
    bestWin: {
      difference: {
        type: Number,
        required: true,
      },
      week: {
        type: Number,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      opposingTeam: {
        type: String,
        required: true,
      },
    },
    worstLoss: {
      difference: {
        type: Number,
        required: true,
      },
      week: {
        type: Number,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      opposingTeam: {
        type: String,
        required: true,
      },
    },
    closestWin: {
      difference: {
        type: Number,
        required: true,
      },
      week: {
        type: Number,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      opposingTeam: {
        type: String,
        required: true,
      },
    },
    closestLoss: {
      difference: {
        type: Number,
        required: true,
      },
      week: {
        type: Number,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      opposingTeam: {
        type: String,
        required: true,
      },
    },
    totalPoints: {
      type: Number,
      required: true,
    },
    totalPointsAgainst: {
      type: Number,
      required: true,
    },
    streak: {
      currentStatus: {
        type: String,
        required: true,
      },
      currentStreak: {
        type: Number,
        required: true,
      },
      longLosing: {
        type: Number,
        required: true,
      },
      longLosingYearStart: {
        type: Number,
        required: true,
      },
      longLosingYearEnd: {
        type: Number,
        required: true,
      },
      longLosingWeekStart: {
        type: Number,
        required: true,
      },
      longLosingWeekEnd: {
        type: Number,
        required: true,
      },
      longWinningYearStart: {
        type: Number,
        required: true,
      },
      longWinningYearEnd: {
        type: Number,
        required: true,
      },
      longWinningWeekStart: {
        type: Number,
        required: true,
      },
      longWinningWeekEnd: {
        type: Number,
        required: true,
      },
      longWinning: {
        type: Number,
        required: true,
      },
    },
    seasons: {
      type: Number,
      required: true,
    },
    averagePoints: {
      type: Number,
      required: true,
    },
    averagePointsAgainst: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OwnerOverview = mongoose.model("OwnerOverview", ownerOverviewSchema);

module.exports = OwnerOverview;
