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
      res.json(getOwnerOverview(boxscores, req.params.ownerId));
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
  var ownerOverview = new Object();
  var seasons = [];
  ownerOverview.wins = 0;
  ownerOverview.losses = 0;
  ownerOverview.ties = 0;

  for (var i = 0; i < boxscores.length; i++) {
    // Set required fields and make calculations.
    const boxscore = boxscores[i];
    const homeTeamScore = calculateScore(boxscore.homeRoster);
    const awayTeamScore = calculateScore(boxscore.awayRoster);

    // Calculate number of seasons in league.
    if (seasons.indexOf(boxscore.year) === -1) {
      seasons.push(boxscore.year);
    }

    // Calculate wins, losses, and ties
    if (homeTeamScore === awayTeamScore) {
      ownerOverview.ties++;
    } else if (
      (boxscore.homeTeamId == ownerId && homeTeamScore > awayTeamScore) ||
      (boxscore.awayTeamId == ownerId && awayTeamScore > homeTeamScore)
    ) {
      ownerOverview.wins++;
    } else {
      ownerOverview.losses++;
    }
  }

  ownerOverview.seasons = seasons.length;
  return ownerOverview;
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

module.exports = router;
