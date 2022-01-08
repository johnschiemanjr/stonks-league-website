const router = require("express").Router();
let PlayoffPerformance = require("../models/playoffPerformance.model");

router.route("/:ownerId").get((req, res) => {
    PlayoffPerformance.find({ ownerId: req.params.ownerId })
        .then((playoffPerformance) => res.json(playoffPerformance))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    console.log(req.body);
    const ownerId = String(req.body.ownerId);
    const wins = Number(req.body.wins);
    const losses = Number(req.body.losses);
    const ties = Number(req.body.ties);
    const appearances = Number(req.body.appearances);
    const championships = Number(req.body.championships);
    const runnerups = Number(req.body.runnerups);

    const newPlayoffPerformance = new PlayoffPerformance({
        ownerId,
        wins,
        losses,
        ties,
        appearances,
        championships,
        runnerups,
    });

    newPlayoffPerformance
        .save()
        .then(() => res.json("Playoff performance added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:ownerId").put((req, res) => {
    PlayoffPerformance.find({ ownerId: req.params.ownerId })
        .then((performances) => {
            performances[0].wins = Number(req.body.wins);
            performances[0].losses = Number(req.body.losses);
            performances[0].ties = Number(req.body.ties);
            performances[0].appearances = Number(req.body.appearances);
            performances[0].championships = Number(req.body.championships);
            performances[0].runnerups = Number(req.body.runnerups);
            performances[0]
                .save()
                .then(() => res.json("Season summary updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;