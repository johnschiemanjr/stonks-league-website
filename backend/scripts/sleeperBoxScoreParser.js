const axios = require("axios");
const year = 2021;
const players = require("../../data/players.json");
const sleeperConverter = require("./sleeperConverter");

// Loop through weeks to add boxscores
for (let week = 1; week < 18; week++) {
    const boxScores = require("../../data/" +
        year +
        "/raw_boxscores/week" +
        week +
        "BoxScore.json");

    let homeTeamBoxScore;
    let awayTeamBoxScore;
    let matchups = [];

    // Loop through the matchups for this week, here i represents the index of the array of boxscores
    // From Sleeper API, each boxscore is broken down per team, so we need to find the pairs based on
    // matchup_id
    for (let i = 0; i < boxScores.length; i++) {
        if (boxScores[i].matchup_id == null) {
            let matchup = new Object();
            matchup.homeTeam = boxScores[i];
            matchup.awayTeam = null;
            matchups.push(matchup);
            continue;
        }
        for (let j = i; j < boxScores.length; j++) {
            if (boxScores[i].matchup_id === boxScores[j].matchup_id && i != j) {
                // This is a matchup.
                let matchup = new Object();
                matchup.homeTeam = boxScores[i];
                matchup.awayTeam = boxScores[j];

                // Only push to array if unique
                if (matchups.indexOf(matchup) === -1) {
                    matchups.push(matchup);
                }
            }
        }
    }

    // Loop through matchups to convert to what the database recognizes
    for (let i = 0; i < matchups.length; i++) {
        let homeTeamRoster = getRoster(matchups[i].homeTeam);
        let awayTeamRoster = getRoster(matchups[i].awayTeam);

        // Create the object that will be pushed to the database
        let dbBoxscore = new Object();
        dbBoxscore.year = year;
        dbBoxscore.week = week;
        dbBoxscore.homeTeamId = sleeperConverter.rosterIdToUserId(
            year,
            matchups[i].homeTeam.roster_id
        );
        if (matchups[i].awayTeam) {
            dbBoxscore.awayTeamId = sleeperConverter.rosterIdToUserId(
                year,
                matchups[i].awayTeam.roster_id
            );
        } else {
            // Bye week
            dbBoxscore.awayTeamId = "-1";
        }

        dbBoxscore.homeRoster = homeTeamRoster;
        dbBoxscore.awayRoster = awayTeamRoster;
        // Post boxscore to database
        axios
            .post("http://localhost:5000/boxscores/add", dbBoxscore)
            .then((res) => console.log(res.data));
        //console.log(dbBoxscore);
    }
}

function getRoster(boxscore) {
    //console.log(boxscore);
    let roster = [];

    if (!boxscore) {
        // Bye week opponent
        return roster;
    }
    const rosteredPlayers = boxscore.players;
    for (let i = 0; i < rosteredPlayers.length; i++) {
        let rosteredPlayer = new Object();

        // This player object is a JSON object from Sleeper that has all player info/
        // Here we find the player based on the numerical value given in rosteredPlayers array
        let player = players[rosteredPlayers[i]];

        rosteredPlayer.name = player.first_name + " " + player.last_name;
        rosteredPlayer.slot = getSlot(boxscore, rosteredPlayers[i]);
        rosteredPlayer.eligibility = getEligibility(player.fantasy_positions);
        rosteredPlayer.points = boxscore.players_points[rosteredPlayers[i]];

        roster.push(rosteredPlayer);
    }

    return roster;
}

function getEligibility(positions) {
    let eligibility = [];
    for (let i = 0; i < positions.length; i++) {
        let position = positions[i];
        if (position === "RB" || position === "WR" || position === "TE") {
            const FLEX = "RB/WR/TE";
            if (eligibility.indexOf(FLEX) === -1) {
                eligibility.push(FLEX);
            }
        }
        eligibility.push(position);
    }
    return eligibility;
}

function getSlot(boxscore, playerId) {
    if (!boxscore) {
        // This is the roster for a bye week
        return null;
    }

    let starters = boxscore.starters;

    // Assumes starters are listed in order...
    if (!starters.includes(playerId)) {
        return "Bench";
    } else if (starters[0] === playerId) {
        return "QB";
    } else if (starters[1] === playerId || starters[2] === playerId) {
        return "RB";
    } else if (starters[3] === playerId || starters[4] === playerId) {
        return "WR";
    } else if (starters[5] === playerId) {
        return "TE";
    } else if (starters[6] === playerId) {
        return "RB/WR/TE";
    } else if (starters[7] === playerId) {
        return "K";
    } else if (starters[8] === playerId) {
        return "D/ST";
    }
}
