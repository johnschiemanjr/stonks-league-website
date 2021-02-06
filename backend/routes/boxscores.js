const router = require("express").Router();
let Boxscore = require("../models/boxscore.model");

router.route("/").get((req, res) => {
  Boxscore.find()
    .then((boxscores) => res.json(boxscores))
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

module.exports = router;
