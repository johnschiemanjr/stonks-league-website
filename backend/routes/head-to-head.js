const router = require("express").Router();
let Boxscore = require("../models/boxscore.model");

router.route("/owner1/:owner1Id/owner2/:owner2Id").get((req, res) => {
    Boxscore.find()
        .or([
            {
                homeTeamId: Number(req.params.owner1Id),
                awayTeamId: Number(req.params.owner2Id),
            },
            {
                homeTeamId: Number(req.params.owner2Id),
                awayTeamId: Number(req.params.owner1Id),
            },
        ])
        .then((boxscores) => {
            res.json(boxscores);
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

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
