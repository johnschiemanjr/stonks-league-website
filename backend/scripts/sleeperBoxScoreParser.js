const year = 2021;
const players = require("../../data/players.json");
const sleeperConverter = require("./sleeperConverter");

// Loop through weeks to add boxscores
for (let week = 1; week < 2; week++) {
    const boxScores = require("../../data/" +
        year +
        "/raw_boxscores/week" +
        week +
        "BoxScore.json");

    var homeTeamBoxScore;
    var awayTeamBoxScore;
    var matchups = [];

    // Loop through the matchups for this week, here i represents the index of the array of boxscores
    // From Sleeper API, each boxscore is broken down per team, so we need to find the pairs based on
    // matchup_id
    for (let i = 0; i < boxScores.length; i++) {
        if (boxScores[i].matchup_id == null) {
            var matchup = new Object();
            matchup.homeTeam = boxScores[i];
            matchup.awayTeam = null;
            matchups.push(matchup);
            continue;
        }
        for (let j = i; j < boxScores.length; j++) {
            if (boxScores[i].matchup_id === boxScores[j].matchup_id && i != j) {
                // This is a matchup.
                var matchup = new Object();
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
        var homeTeamRoster = getRoster(matchups[i].homeTeam);
        var awayTeamRoster = getRoster(matchups[i].awayTeam);
    }
    //sleeperConverter.rosterIdToUserId(year, boxScores[0].roster_id);
    //console.log(boxScores);
    //console.log(players[boxScores[0].starters[8]]);
}

function getRoster(boxscore) {
    console.log(boxscore);
    var roster = [];

    const rosteredPlayers = boxscore.players;
    for (let i = 0; i < rosteredPlayers.length; i++) {
        let player = players[rosteredPlayers[i]];
        //console.log(player.first_name + " " + player.last_name);
        player.fantasy_positions.forEach((position) => {
            //console.log(position);
        });
    }
}
