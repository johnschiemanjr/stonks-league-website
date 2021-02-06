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
    var homeRoster = [];
    var awayRoster = [];

    for (var j = 0; j < req.body.boxscores[i].homeRoster.length; j++) {
      const newHomePlayer = new Player({
        name: req.body.boxscores[i].homeRoster[j].name,
        slot: req.body.boxscores[i].homeRoster[j].slot,
        eligibility: req.body.boxscores[i].homeRoster[j].eligibility,
        points: Number(req.body.boxscores[i].homeRoster[j].points),
      });
      newHomePlayer
        .save()
        .catch((err) =>
          res.status(400).json("Error when saving home player: " + err)
        );
      homeRoster.push(newHomePlayer);
    }

    for (var k = 0; k < req.body.boxscores[i].awayRoster.length; k++) {
      const newAwayPlayer = new Player({
        name: req.body.boxscores[i].awayRoster[k].name,
        slot: req.body.boxscores[i].awayRoster[k].slot,
        eligibility: req.body.boxscores[i].awayRoster[k].eligibility,
        points: Number(req.body.boxscores[i].awayRoster[k].points),
      });
      newAwayPlayer
        .save()
        .catch((err) =>
          res.status(400).json("Error when saving away player " + err)
        );
      awayRoster.push(newAwayPlayer);
    }

    const newBoxscore = new Boxscore({
      homeTeamId: req.body.boxscores[i].homeTeamId,
      awayTeamId: req.body.boxscores[i].awayTeamId,
      homeRoster: homeRoster,
      awayRoster: awayRoster,
    });

    newBoxscore
      .save()
      .catch((err) =>
        res.status(400).json("Error when saving boxscore " + err)
      );

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
    .catch((err) => res.status(400).json("Error when saving week: " + err));
});

module.exports = router;
