const router = require("express").Router();
let Boxscore = require("../models/boxscore.model");

router.route("/year/:year/week/:week").get((req, res) => {
  Boxscore.find({ year: req.params.year, week: req.params.week })
    .then((boxscores) => res.json(boxscores))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/ownerBoxscores/:ownerId").get((req, res) => {
  Boxscore.find()
    .or([
      { homeTeamId: req.params.ownerId },
      { awayTeamId: req.params.ownerId },
    ])
    .then((boxscores) => {
      res.json(getOwnerOverview(boxscores, Number(req.params.ownerId)));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const year = Number(req.body.year);
  const week = Number(req.body.week);
  const homeTeamId = Number(req.body.homeTeamId);
  const awayTeamId = Number(req.body.awayTeamId);
  const homeRoster = req.body.homeRoster;
  const awayRoster = req.body.awayRoster;

  const newBoxscore = new Boxscore({
    year,
    week,
    homeTeamId,
    awayTeamId,
    homeRoster,
    awayRoster,
  });

  newBoxscore
    .save()
    .then(() => res.json("Boxscore added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

function getOwnerOverview(boxscores, ownerId) {
  // Sort boxscores
  boxscores.sort(function (boxscore1, boxscore2) {
    if (boxscore1.year === boxscore2.year) {
      return boxscore1.week - boxscore2.week;
    }
    return boxscore1.year > boxscore2.year ? 1 : -1;
  });

  //TODO Account for byes
  var ownerOverview = new Object();
  var seasons = [];
  ownerOverview.wins = 0;
  ownerOverview.losses = 0;
  ownerOverview.ties = 0;
  ownerOverview.highScore = { score: 0 };
  ownerOverview.lowScore = { score: 0 };
  ownerOverview.bestWin = { difference: 0 };
  ownerOverview.worstLoss = { difference: 0 };
  ownerOverview.closestWin = { difference: 0 };
  ownerOverview.closestLoss = { difference: 0 };
  ownerOverview.totalPoints = 0;
  ownerOverview.totalPointsAgainst = 0;
  ownerOverview.streak = {
    currentStatus: "W",
    currentStreak: 0,
    longLosing: 0,
    longLosingYearStart: 0,
    longLosingYearEnd: 0,
    longLosingWeekStart: 0,
    longLosingWeekEnd: 0,
    longWinningYearStart: 0,
    longWinningYearEnd: 0,
    longWinningWeekStart: 0,
    longWinningWeekEnd: 0,
    longWinning: 0,
  };

  var nonByeWeeks = 0;
  var winLossArray = [];
  for (var i = 0; i < boxscores.length; i++) {
    // Set required fields and make calculations.
    const boxscore = boxscores[i];

    var ownerRoster;
    var opposingRoster;
    var OPPOSING_OWNER_ID;
    if (boxscore.homeTeamId == ownerId) {
      ownerRoster = boxscore.homeRoster;
      opposingRoster = boxscore.awayRoster;
      OPPOSING_OWNER_ID = boxscore.awayTeamId;
    } else {
      ownerRoster = boxscore.awayRoster;
      opposingRoster = boxscore.homeRoster;
      OPPOSING_OWNER_ID = boxscore.homeTeamId;
    }

    const ownerScore = calculateScore(ownerRoster);
    const opposingScore = calculateScore(opposingRoster);
    const matchupMargin = ownerScore - opposingScore;

    // Only do these if not a bye week
    if (OPPOSING_OWNER_ID != -1) {
      // Calculate wins, losses, and ties
      setRecord(ownerOverview, ownerScore, opposingScore);
      // Calculate best/worst wins/losses
      setBestsAndWorsts(
        matchupMargin,
        ownerOverview,
        ownerScore,
        opposingScore,
        boxscore.week,
        OPPOSING_OWNER_ID
      );
      //Set streaks
      setStreak(matchupMargin, ownerOverview);
      setLongStreaks(
        matchupMargin,
        ownerOverview,
        boxscore.year,
        boxscore.week,
        winLossArray
      );
      ownerOverview.totalPointsAgainst += opposingScore;
      nonByeWeeks++;
    }

    // Calculate number of seasons in league.
    setSeasons(seasons, boxscore.year);
    // Calculate max and min scores
    setMaxAndMin(ownerOverview, ownerScore, boxscore.week, OPPOSING_OWNER_ID);
    // Add total points
    ownerOverview.totalPoints += ownerScore;
  }

  var result;
  var size = 1;
  var max_size = 1;
  var startWeek;
  var endWeek;
  for (var i = 0; i < winLossArray.length; i++) {
    if (i > 0) {
      const winLossEntry = winLossArray[i];
      const previous = winLossArray[i - 1];
      if (winLossEntry.result === previous.result) {
        size++;
        if (size > max_size) {
          max_size = size;
        }
      } else {
        size = 0;
        endWeek = previous.week;
      }
    }
  }

  console.log(max_size + " from " + startWeek + " to " + endWeek);

  ownerOverview.seasons = seasons.length;
  ownerOverview.averagePoints = ownerOverview.totalPoints / boxscores.length;
  ownerOverview.averagePointsAgainst =
    ownerOverview.totalPointsAgainst / nonByeWeeks;
  return ownerOverview;
}

function setSeasons(seasons, year) {
  if (seasons.indexOf(year) === -1) {
    seasons.push(year);
  }
}

function calculateScore(roster) {
  var score = 0;
  for (var i = 0; i < roster.length; i++) {
    const position = roster[i].slot;
    if (position !== "Bench" && position !== "IR") {
      score += roster[i].points;
    }
  }
  return score;
}

function setRecord(ownerOverview, ownerScore, opposingScore) {
  if (ownerScore === opposingScore) {
    ownerOverview.ties++;
  } else if (ownerScore > opposingScore) {
    ownerOverview.wins++;
  } else {
    ownerOverview.losses++;
  }
}

function setMaxAndMin(ownerOverview, ownerScore, week, opposingOwnerId) {
  if (ownerScore > ownerOverview.highScore.score) {
    ownerOverview.highScore.score = ownerScore;
    ownerOverview.highScore.week = week;
    ownerOverview.highScore.opposingTeam = opposingOwnerId;
  }
  if (
    ownerScore < ownerOverview.lowScore.score ||
    ownerOverview.lowScore.score === 0
  ) {
    ownerOverview.lowScore.score = ownerScore;
    ownerOverview.lowScore.week = week;
    ownerOverview.lowScore.opposingTeam = opposingOwnerId;
  }
}

function setBestsAndWorsts(
  matchupMargin,
  ownerOverview,
  ownerScore,
  opposingScore,
  week,
  opposingOwnerId
) {
  if (matchupMargin > 0) {
    // A win
    if (
      matchupMargin > ownerOverview.bestWin.difference ||
      ownerOverview.bestWin.difference === 0
    ) {
      ownerOverview.bestWin.difference = matchupMargin;
      ownerOverview.bestWin.week = week;
      ownerOverview.bestWin.opposingTeam = opposingOwnerId;
    }
    if (
      matchupMargin < ownerOverview.closestWin.difference ||
      ownerOverview.closestWin.difference === 0
    ) {
      ownerOverview.closestWin.difference = matchupMargin;
      ownerOverview.closestWin.week = week;
      ownerOverview.closestWin.opposingTeam = opposingOwnerId;
    }
  } else if (matchupMargin < 0) {
    // A loss
    if (
      matchupMargin > ownerOverview.closestLoss.difference ||
      ownerOverview.closestLoss.difference === 0
    ) {
      ownerOverview.closestLoss.difference = matchupMargin;
      ownerOverview.closestLoss.week = week;
      ownerOverview.closestLoss.opposingTeam = opposingOwnerId;
    }
    if (
      matchupMargin < ownerOverview.worstLoss.difference ||
      ownerOverview.worstLoss.difference === 0
    ) {
      ownerOverview.worstLoss.difference = matchupMargin;
      ownerOverview.worstLoss.week = week;
      ownerOverview.worstLoss.opposingTeam = opposingOwnerId;
    }
  }
}

function setStreak(matchupMargin, ownerOverview) {
  if (matchupMargin === 0) {
    // A tie
    if (ownerOverview.streak.currentStatus === "T") {
      ownerOverview.streak.currentStreak++;
    } else {
      ownerOverview.streak.currentStreak = 1;
    }
    ownerOverview.streak.currentStatus = "T";
  } else if (matchupMargin > 0) {
    // A win
    if (ownerOverview.streak.currentStatus === "W") {
      ownerOverview.streak.currentStreak++;
    } else {
      ownerOverview.streak.currentStreak = 1;
    }
    ownerOverview.streak.currentStatus = "W";
  } else if (matchupMargin < 0) {
    // A loss
    if (ownerOverview.streak.currentStatus === "L") {
      ownerOverview.streak.currentStreak++;
    } else {
      ownerOverview.streak.currentStreak = 1;
    }
    ownerOverview.streak.currentStatus = "L";
  }
}

function setLongStreaks(
  matchupMargin,
  ownerOverview,
  year,
  week,
  winLossArray
) {
  if (matchupMargin === 0) {
    // A tie
    winLossArray.push({ result: "T", year: year, week: week });
  } else if (matchupMargin > 0) {
    // A win
    winLossArray.push({ result: "W", year: year, week: week });
  } else if (matchupMargin < 0) {
    // A loss
    winLossArray.push({ result: "L", year: year, week: week });
  }
}

module.exports = router;
