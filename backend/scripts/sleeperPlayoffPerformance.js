const axios = require("axios");
const sleeperConverter = require("./sleeperConverter");

const YEAR = 2021;
const winnersBracket = require("../../data/" +
    YEAR +
    "/league_winners_bracket.json");

let appearances = [];
//console.log(winnersBracket);

winnersBracket.forEach((matchup) => {
    let team1Id = matchup.t1;
    let team2Id = matchup.t2;

    if (appearances.indexOf(team1Id) === -1) {
        appearances.push(team1Id);
    }
    if (appearances.indexOf(team2Id) === -1) {
        appearances.push(team2Id);
    }
});

// print winners bracket

//console.log(appearances);

let week1Matchups = winnersBracket.filter((matchup) => {
    return matchup.r === 1;
});
let week1Winners = [];

week1Matchups.forEach((matchup) => {
    console.log(matchup.w + " beats " + matchup.l);
    week1Winners.push(matchup.w);
});

let week2Matchups = winnersBracket.filter((matchup) => {
    return matchup.r === 2;
});
let week2Winners = [];

week2Matchups.forEach((matchup) => {
    if (
        week1Winners.indexOf(matchup.w) === -1 &&
        week1Winners.indexOf(matchup.l) === -1
    ) {
        // Do nothing, this is a consolation game
    } else {
        console.log(matchup.w + " beats " + matchup.l);
        week2Winners.push(matchup.w);
    }
});

let week3Matchups = winnersBracket.filter((matchup) => {
    return matchup.r === 3;
});
let week3Winners = [];

week3Matchups.forEach((matchup) => {
    if (
        week2Winners.indexOf(matchup.w) === -1 &&
        week2Winners.indexOf(matchup.l) === -1
    ) {
        // Do nothing, this is a consolation game
    } else {
        console.log(matchup.w + " beats " + matchup.l);
        week3Winners.push(matchup.w);
    }
});

let ownersToUpdate = [];
appearances.forEach((appearanceId) => {
    let performance = new Object();
    performance.wins = 0;
    performance.losses = 0;
    performance.ties = 0;
    performance.appearances = 0;
    performance.championships = [];
    performance.runnerups = [];

    performance.ownerId = sleeperConverter.rosterIdToUserId(YEAR, appearanceId);
    performance.appearances++;

    if (week3Winners.indexOf(appearanceId) !== -1) {
        performance.championships.push(YEAR);
    } else {
        if (week2Winners.indexOf(appearanceId) !== -1) {
            performance.runnerups.push(YEAR);
        }
        performance.losses++;
    }

    if (week1Winners.indexOf(appearanceId) !== -1) {
        performance.wins++;
    }
    if (week2Winners.indexOf(appearanceId) !== -1) {
        performance.wins++;
    }
    if (week3Winners.indexOf(appearanceId) !== -1) {
        performance.wins++;
    }

    postPerformance(performance);
});

function postPerformance(performance) {
    let requestString =
        "http://localhost:5000/playoffPerformance/" +
        String(performance.ownerId);
    axios
        .get(requestString)
        .then((response) => {
            if (response.data.length === 0) {
                axios
                    .post(
                        "http://localhost:5000/playoffPerformance/add",
                        performance
                    )
                    .then((res) => console.log(res.data))
                    .catch((error) => {
                        throw error;
                    });
            } else {
                updateAndPut(performance, response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateAndPut(performanceToAdd, existingPerformance) {
    existingPerformance.wins += performanceToAdd.wins;
    existingPerformance.losses += performanceToAdd.losses;
    existingPerformance.ties += performanceToAdd.ties;
    existingPerformance.appearances += performanceToAdd.appearances;
    existingPerformance.championships = existingPerformance.championships.concat(
        performanceToAdd.championships
    );
    existingPerformance.runnerups = existingPerformance.runnerups.concat(
        performanceToAdd.runnerups
    );

    axios
        .put(
            "http://localhost:5000/playoffPerformance/update/" +
                existingPerformance.ownerId,
            existingPerformance
        )
        .then((res) => console.log(res.data))
        .catch((error) => {
            throw error;
        });
}
