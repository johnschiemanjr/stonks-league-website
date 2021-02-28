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
  const playoffStatus = req.body.playoffStatus;

  const newBoxscore = new Boxscore({
    year,
    week,
    homeTeamId,
    awayTeamId,
    playoffStatus,
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
  ownerOverview.streak = { currentStatus: "W" };

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
        boxscore.year,
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
    setMaxAndMin(
      ownerOverview,
      ownerScore,
      boxscore.week,
      boxscore.year,
      OPPOSING_OWNER_ID
    );
    // Add total points
    ownerOverview.totalPoints += ownerScore;
  }

  const winStreak = getStreak("W", winLossArray);
  const lossStreak = getStreak("L", winLossArray);

  ownerOverview.streak.longLosing = lossStreak.longStreak;
  ownerOverview.streak.longLosingYearStart = lossStreak.startYear;
  ownerOverview.streak.longLosingYearEnd = lossStreak.endYear;
  ownerOverview.streak.longLosingWeekStart = lossStreak.startWeek;
  ownerOverview.streak.longLosingWeekEnd = lossStreak.endWeek;
  ownerOverview.streak.longWinningYearStart = winStreak.startYear;
  ownerOverview.streak.longWinningYearEnd = winStreak.endYear;
  ownerOverview.streak.longWinningWeekStart = winStreak.startWeek;
  ownerOverview.streak.longWinningWeekEnd = winStreak.endWeek;
  ownerOverview.streak.longWinning = winStreak.longStreak;

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

function setMaxAndMin(ownerOverview, ownerScore, week, year, opposingOwnerId) {
  if (ownerScore > ownerOverview.highScore.score) {
    ownerOverview.highScore.score = ownerScore;
    ownerOverview.highScore.week = week;
    ownerOverview.highScore.year = year;
    ownerOverview.highScore.opposingTeam = opposingOwnerId;
  }
  if (
    ownerScore < ownerOverview.lowScore.score ||
    ownerOverview.lowScore.score === 0
  ) {
    ownerOverview.lowScore.score = ownerScore;
    ownerOverview.lowScore.week = week;
    ownerOverview.lowScore.year = year;
    ownerOverview.lowScore.opposingTeam = opposingOwnerId;
  }
}

function setBestsAndWorsts(
  matchupMargin,
  ownerOverview,
  ownerScore,
  opposingScore,
  week,
  year,
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
      ownerOverview.bestWin.year = year;
      ownerOverview.bestWin.opposingTeam = opposingOwnerId;
    }
    if (
      matchupMargin < ownerOverview.closestWin.difference ||
      ownerOverview.closestWin.difference === 0
    ) {
      ownerOverview.closestWin.difference = matchupMargin;
      ownerOverview.closestWin.week = week;
      ownerOverview.closestWin.year = year;
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
      ownerOverview.closestLoss.year = year;
      ownerOverview.closestLoss.opposingTeam = opposingOwnerId;
    }
    if (
      matchupMargin < ownerOverview.worstLoss.difference ||
      ownerOverview.worstLoss.difference === 0
    ) {
      ownerOverview.worstLoss.difference = matchupMargin;
      ownerOverview.worstLoss.week = week;
      ownerOverview.worstLoss.year = year;
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

function getStreak(result, winLossArray) {
  var streak = 0;
  var longStreak = 0;
  var startWeek = winLossArray[0].week;
  var endWeek = winLossArray[0].week;
  var startYear = winLossArray[0].year;
  var startYear = winLossArray[0].year;
  var tempStartWeek = startWeek;
  var tempStartYear = startYear;
  var streakWasSet = false;

  for (var i = 0; i < winLossArray.length; i++) {
    const winLossElement = winLossArray[i];
    if (winLossElement.result === result) {
      if (streak === 0) {
        tempStartWeek = winLossElement.week;
        tempStartYear = winLossElement.year;
      }
      streak++;
      if (streak > longStreak) {
        longStreak = streak;
        startWeek = tempStartWeek;
        startYear = tempStartYear;
        streakWasSet = true;
        endWeek = winLossArray[winLossArray.length - 1].week;
        endYear = winLossArray[winLossArray.length - 1].year;
      }
    } else {
      if (streakWasSet) {
        streakWasSet = false;
        if (i > 0) {
          endWeek = winLossArray[i - 1].week;
          endYear = winLossArray[i - 1].year;
        }
      }
      streak = 0;
    }
  }
  return {
    longStreak: longStreak,
    startWeek: startWeek,
    startYear: startYear,
    endWeek: endWeek,
    endYear: endYear,
  };
}

module.exports = router;
