const router = require("express").Router();
let Week = require("../models/week.model");
let Boxscore = require("../models/boxscore.model");
let Player = require("../models/player.model");

router.route("/").get((req, res) => {
  Week.find()
    .then((weeks) => res.json(weeks))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const year = Number(req.body.year);
  const weekId = Number(req.body.weekId);
  var boxscores = [];

  for (var i = 0; i < req.body.boxscores.length; i++) {
    const newBoxscore = new Boxscore({
      homeTeamId: req.body.boxscores[i].homeTeamId,
      awayTeamId: req.body.boxscores[i].awayTeamId,
    });

    newBoxscore.save().catch((err) => res.status(400).json("Error: " + err));

    boxscores.push(newBoxscore);
  }

  const newWeek = new Week({
    year: year,
    weekId: weekId,
    boxscores: boxscores,
  });

  newWeek
    .save()
    .then(() => res.json("Week added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
