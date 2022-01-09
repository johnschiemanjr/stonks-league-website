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

module.exports = router;
