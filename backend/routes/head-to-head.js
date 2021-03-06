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
            res.json(
                getHeadToHeadResults(
                    boxscores,
                    Number(req.params.owner1Id),
                    Number(req.params.owner2Id)
                )
            );
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

function getHeadToHeadResults(boxscores, owner1Id, owner2Id) {
    // Sort boxscores
    boxscores.sort(function (boxscore1, boxscore2) {
        if (boxscore1.year === boxscore2.year) {
            return boxscore1.week - boxscore2.week;
        }
        return boxscore1.year > boxscore2.year ? 1 : -1;
    });

    var headToHeadResult = new Object();
    headToHeadResult.owner1 = new Object();
    headToHeadResult.owner2 = new Object();
    headToHeadResult.owner1.totalPoints = 0;
    headToHeadResult.owner2.totalPoints = 0;
    headToHeadResult.owner1.wins = 0;
    headToHeadResult.owner2.wins = 0;
    headToHeadResult.owner1.losses = 0;
    headToHeadResult.owner2.losses = 0;
    headToHeadResult.owner1.ties = 0;
    headToHeadResult.owner2.ties = 0;
    headToHeadResult.owner1.highScore = { score: 0 };
    headToHeadResult.owner1.lowScore = { score: 0 };
    headToHeadResult.owner2.highScore = { score: 0 };
    headToHeadResult.owner2.lowScore = { score: 0 };
    headToHeadResult.owner1.bestWin = {
        winningScore: 0,
        losingScore: 0,
        margin: 0,
    };
    headToHeadResult.owner1.closestWin = {
        winningScore: 0,
        losingScore: 0,
        margin: 0,
    };
    headToHeadResult.owner2.bestWin = {
        winningScore: 0,
        losingScore: 0,
        margin: 0,
    };
    headToHeadResult.owner2.closestWin = {
        winningScore: 0,
        losingScore: 0,
        margin: 0,
    };
    headToHeadResult.owner1.bestStreak = 0;
    headToHeadResult.owner1.currentStreak = 0;
    headToHeadResult.owner2.bestStreak = 0;
    headToHeadResult.owner2.currentStreak = 0;
    headToHeadResult.scores = [];

    for (var i = 0; i < boxscores.length; i++) {
        // Set required fields and make calculations.
        const boxscore = boxscores[i];

        var owner1Roster;
        var owner2Roster;
        if (boxscore.homeTeamId === owner1Id) {
            owner1Roster = boxscore.homeRoster;
            owner2Roster = boxscore.awayRoster;
        } else {
            owner1Roster = boxscore.awayRoster;
            owner2Roster = boxscore.homeRoster;
        }

        const owner1Score = calculateScore(owner1Roster);
        const owner2Score = calculateScore(owner2Roster);

        const owner1Margin = owner1Score - owner2Score;
        const owner2Margin = owner2Score - owner1Score;

        // Set the records and win streaks for both owners
        setRecordsAndStreaks(
            headToHeadResult.owner1,
            headToHeadResult.owner2,
            owner1Margin
        );

        // Set the best and closest wins for owner1
        setBestAndClosest(
            headToHeadResult.owner1,
            owner1Margin,
            boxscore.week,
            boxscore.year,
            owner1Score,
            owner2Score
        );
        // Set the best and closest wins for owner2
        setBestAndClosest(
            headToHeadResult.owner2,
            owner2Margin,
            boxscore.week,
            boxscore.year,
            owner2Score,
            owner1Score
        );

        // Set the maximum and minumum amount of points scored for owner1
        setMaxAndMin(
            headToHeadResult.owner1,
            owner1Score,
            boxscore.week,
            boxscore.year
        );
        // Set the maximum and minumum amount of points scored for owner2
        setMaxAndMin(
            headToHeadResult.owner2,
            owner2Score,
            boxscore.week,
            boxscore.year
        );

        // Add total points for both owners
        headToHeadResult.owner1.totalPoints += owner1Score;
        headToHeadResult.owner2.totalPoints += owner2Score;

        // Add score to list of boxscores
        const score = {
            owner1Score: owner1Score,
            owner2Score: owner2Score,
            week: boxscore.week,
            year: boxscore.year,
            boxscoreId: boxscore._id,
        };
        headToHeadResult.scores.push(score);
    }

    // Calculate average points
    headToHeadResult.owner1.averagePoints =
        headToHeadResult.owner1.totalPoints / boxscores.length;
    headToHeadResult.owner2.averagePoints =
        headToHeadResult.owner2.totalPoints / boxscores.length;

    return headToHeadResult;
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

function setMaxAndMin(owner, ownerScore, week, year) {
    if (ownerScore > owner.highScore.score) {
        owner.highScore.score = ownerScore;
        owner.highScore.week = week;
        owner.highScore.year = year;
    }
    if (ownerScore < owner.lowScore.score || owner.lowScore.score === 0) {
        owner.lowScore.score = ownerScore;
        owner.lowScore.week = week;
        owner.lowScore.year = year;
    }
}

function setBestAndClosest(
    owner,
    margin,
    week,
    year,
    ownerScore,
    opposingScore
) {
    if (margin > 0 && margin > owner.bestWin.margin) {
        owner.bestWin.winningScore = ownerScore;
        owner.bestWin.losingScore = opposingScore;
        owner.bestWin.margin = margin;
        owner.bestWin.week = week;
        owner.bestWin.year = year;
    }
    if (
        margin > 0 &&
        (margin < owner.closestWin.margin || owner.closestWin.margin === 0)
    ) {
        owner.closestWin.winningScore = ownerScore;
        owner.closestWin.losingScore = opposingScore;
        owner.closestWin.margin = margin;
        owner.closestWin.week = week;
        owner.closestWin.year = year;
    }
}

function setRecordsAndStreaks(owner1, owner2, owner1Margin) {
    if (owner1Margin > 0) {
        owner1.wins++;
        owner2.losses++;
        owner1.currentStreak++;
        owner2.currentStreak = 0;
        if (owner1.currentStreak > owner1.bestStreak) {
            owner1.bestStreak = owner1.currentStreak;
        }
    } else if (owner1Margin < 0) {
        owner1.losses++;
        owner2.wins++;
        owner2.currentStreak++;
        owner1.currentStreak = 0;
        if (owner2.currentStreak > owner2.bestStreak) {
            owner2.bestStreak = owner2.currentStreak;
        }
    } else {
        owner1.ties++;
        owner2.ties++;
        owner2.currentStreak = 0;
        owner1.currentStreak = 0;
    }
}

module.exports = router;
