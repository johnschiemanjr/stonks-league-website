const router = require("express").Router();
let Boxscore = require("../models/boxscore.model");

router.route("/year/:year/week/:week").get((req, res) => {
  Boxscore.find({ year: req.params.year, week: req.params.week })
    .then((boxscores) => res.json(boxscores))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/ownerId/:ownerId").get((req, res) => {
  Boxscore.find()
    .or([
      { homeTeamId: req.params.ownerId },
      { awayTeamId: req.params.ownerId },
    ])
    .then((boxscores) => {
      res.json(boxscores);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/top").get((req, res) => {
  Boxscore.find()
    .then((boxscores) => {
      res.json(getTopScores(boxscores));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/lowest").get((req, res) => {
  Boxscore.find()
    .then((boxscores) => {
      res.json(getLowestScores(boxscores));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const year = Number(req.body.year);
  const week = Number(req.body.week);
  const homeTeamId = req.body.homeTeamId;
  const awayTeamId = req.body.awayTeamId;
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

function getTopScores(boxscores) {
  let topScores = [];
  for (let j = 0; j < 10; j++) {
    topScores[j] = new Object();
    topScores[j].score = 0;
  }

  for (let i = 0; i < boxscores.length; i++) {
    let homeScore = calculateScore(boxscores[i].homeRoster);
    let awayScore = calculateScore(boxscores[i].awayRoster);
    if (homeScore > topScores[9].score) {
      topScores[9].score = homeScore;
      topScores[9].teamId = boxscores[i].homeTeamId;
      topScores[9].year = boxscores[i].year;
      topScores[9].week = boxscores[i].week;
      topScores.sort(function (a, b) {
        return b.score - a.score;
      });
    }
    if (awayScore > topScores[9].score) {
      topScores[9].score = awayScore;
      topScores[9].teamId = boxscores[i].awayTeamId;
      topScores[9].year = boxscores[i].year;
      topScores[9].week = boxscores[i].week;
      topScores.sort(function (a, b) {
        return b.score - a.score;
      });
    }
  }
  return topScores;
}

function getLowestScores(boxscores) {
  let bottomScores = [];
  for (let j = 0; j < 10; j++) {
    bottomScores[j] = new Object();
    bottomScores[j].score = 100000;
  }

  for (let i = 0; i < boxscores.length; i++) {
    let homeScore = calculateScore(boxscores[i].homeRoster);
    let awayScore = calculateScore(boxscores[i].awayRoster);
    if (homeScore < bottomScores[9].score && boxscores[i].homeTeamId !== "-1") {
      bottomScores[9].score = homeScore;
      bottomScores[9].teamId = boxscores[i].homeTeamId;
      bottomScores[9].year = boxscores[i].year;
      bottomScores[9].week = boxscores[i].week;
      bottomScores.sort(function (a, b) {
        return a.score - b.score;
      });
    }
    if (awayScore < bottomScores[9].score && boxscores[i].awayTeamId !== "-1") {
      bottomScores[9].score = awayScore;
      bottomScores[9].teamId = boxscores[i].awayTeamId;
      bottomScores[9].year = boxscores[i].year;
      bottomScores[9].week = boxscores[i].week;
      bottomScores.sort(function (a, b) {
        return a.score - b.score;
      });
    }
  }
  return bottomScores;
}

function calculateScore(roster) {
  var score = 0;
  for (let i = 0; i < roster.length; i++) {
    const position = roster[i].slot;
    if (position !== "Bench" && position !== "IR") {
      score += roster[i].points;
    }
  }
  return score;
}

module.exports = router;
