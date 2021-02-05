const router = require("express").Router();
let Week = require("../models/week.model");
let Boxscore = require("../models/boxscore.model");
let Player = require("../models/player.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const year = Number(req.body.year);
  const weekId = Number(req.body.weekId);

  const newWeek = new Week({
    year: year,
    weekId: weekId,
    boxscores: req.body.boxscores,
  });

  newWeek.boxscores.push(req.body.boxscores[0]);

  newWeek
    .save()
    .then(() => res.json("Week added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
