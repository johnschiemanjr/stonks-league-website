const {
    Client,
    Player,
    BoxscorePlayer,
} = require("espn-fantasy-football-api/node-dev"); // node
const fs = require("fs");

// Console will print the message
console.log("Getting data...");

const myClient = new Client({ leagueId: 67314407 });
myClient.setCookies({
    espnS2:
        "***REMOVED***",
    SWID: "{1686483F-1733-4E45-A4AF-BB88A4D6B3A9}",
});

const leagueInfo = myClient.getLeagueInfo({ seasonId: 2020 });
const teams = myClient.getTeamsAtWeek({ seasonId: 2020, scoringPeriodId: 0 });
const boxScores = [];
var j;
for (j = 1; j < 17; j++) {
    console.log("Getting box scores for Week " + j);
    boxScores[j - 1] = myClient.getBoxscoreForWeek({
        seasonId: 2020,
        matchupPeriodId: j,
        scoringPeriodId: j,
    });
}

teams.then(function (result) {
    var ownerMap = new Map();
    var i;
    for (i = 0; i < result.length; i++) {
        ownerMap.set(result[i].id, {
            name: result[i].name,
            totalPoints: 0,
            possiblePoints: 0,
        });
    }

    Promise.all(boxScores).then((values) => {
        var i;
        for (i = 0; i < values.length; i++) {
            console.log("Week " + (i + 1));
            var j;
            for (j = 0; j < values[i].length; j++) {
                if (typeof values[i][j].homeTeamId != "undefined") {
                    var homeTeamPossible = getOptimalScore(
                        values[i][j].homeRoster,
                        values[i][j].homeTeamId,
                        ownerMap
                    );
                    console.log(
                        ownerMap.get(values[i][j].homeTeamId).name +
                            " scored  " +
                            values[i][j].homeScore +
                            " out of a possible " +
                            homeTeamPossible
                    );
                    ownerMap.get(values[i][j].homeTeamId).totalPoints +=
                        values[i][j].homeScore;
                    ownerMap.get(
                        values[i][j].homeTeamId
                    ).possiblePoints += homeTeamPossible;
                }
                if (typeof values[i][j].awayTeamId != "undefined") {
                    var awayTeamPossible = getOptimalScore(
                        values[i][j].awayRoster,
                        values[i][j].awayTeamId,
                        ownerMap
                    );
                    console.log(
                        ownerMap.get(values[i][j].awayTeamId).name +
                            " scored  " +
                            values[i][j].awayScore +
                            " out of a possible " +
                            awayTeamPossible
                    );
                    ownerMap.get(values[i][j].awayTeamId).totalPoints +=
                        values[i][j].awayScore;
                    ownerMap.get(
                        values[i][j].awayTeamId
                    ).possiblePoints += awayTeamPossible;
                }
                console.log();
            }
            console.log();
        }
        ownerMap.forEach((owner) => {
            console.log(
                owner.name +
                    " with a total of " +
                    owner.totalPoints +
                    " out of a possible " +
                    owner.possiblePoints
            );
        });
    });
});

//leagueInfo.then(function(result) {
//   console.log(result);
//});

//boxScores[7].then(function(result) {
//   console.log(result);
//   console.log(result[0].homeScore);
//   console.log(result[0].homeRoster);
//});

function getOptimalScore(roster, teamId, ownerMap) {
    // Roster is an array of players
    //if (teamId == 1)
    {
        var rb1 = new BoxscorePlayer();
        var rb2 = new BoxscorePlayer();
        var qb = new BoxscorePlayer();
        var wr1 = new BoxscorePlayer();
        var wr2 = new BoxscorePlayer();
        var te = new BoxscorePlayer();
        var flex = new BoxscorePlayer();
        var kicker = new BoxscorePlayer();
        kicker.totalPoints = 0;
        kicker.player = new Player();
        kicker.player.fullName = "Empty";
        var defense = new BoxscorePlayer();
        defense.totalPoints = 0;
        defense.player = new Player();
        defense.player.fullName = "Empty";
        var i;
        var player;
        for (i = 0; i < roster.length; i++) {
            //console.log(roster[i].player.fullName + " " + roster[i].player.id + " " + roster[i].player.eligiblePositions + " " + roster[i].totalPoints);

            player = roster[i];
            if (
                player.player.eligiblePositions.includes("RB") &&
                (typeof rb1.totalPoints == "undefined" ||
                    player.totalPoints > rb1.totalPoints)
            ) {
                //console.log("Adding " + player.player.fullName + " as RB1 with score of " + player.totalPoints);
                rb1 = player;
            }
            if (
                player.player.eligiblePositions.includes("WR") &&
                (typeof wr1.totalPoints == "undefined" ||
                    player.totalPoints > wr1.totalPoints)
            ) {
                //console.log("Adding " + roster[i].player.fullName + " as WR1 with score of " + player.totalPoints);
                wr1 = player;
            }
            if (
                player.player.eligiblePositions.includes("QB") &&
                (typeof qb.totalPoints == "undefined" ||
                    player.totalPoints > qb.totalPoints)
            ) {
                //console.log("Adding " + player.player.fullName + " as QB with score of " + player.totalPoints);
                qb = player;
            }
            if (
                player.player.eligiblePositions.includes("TE") &&
                (typeof te.totalPoints == "undefined" ||
                    player.totalPoints > te.totalPoints)
            ) {
                //console.log("Adding " + player.player.fullName + " as TE with score of " + player.totalPoints);
                te = player;
            }
            if (
                player.player.eligiblePositions.includes("K") &&
                player.totalPoints > kicker.totalPoints
            ) {
                //console.log("Adding " + player.player.fullName + " as K with score of " + player.totalPoints);
                kicker = player;
            }
            if (
                player.player.eligiblePositions.includes("D/ST") &&
                player.totalPoints > defense.totalPoints
            ) {
                //console.log("Adding " + player.player.fullName + " as D/ST with score of " + player.totalPoints);
                defense = player;
            }
        }
        for (i = 0; i < roster.length; i++) {
            player = roster[i];
            if (
                player.player.eligiblePositions.includes("RB") &&
                (typeof rb2.totalPoints == "undefined" ||
                    player.totalPoints > rb2.totalPoints) &&
                player.player.id != rb1.player.id
            ) {
                //console.log("Adding " + player.player.fullName + " as RB2 with score of " + player.totalPoints);
                rb2 = player;
            }
            if (
                player.player.eligiblePositions.includes("WR") &&
                (typeof wr2.totalPoints == "undefined" ||
                    player.totalPoints > wr2.totalPoints) &&
                player.player.id != wr1.player.id
            ) {
                //console.log("Adding " + roster[i].player.fullName + " as WR2 with score of " + player.totalPoints);
                wr2 = player;
            }
        }
        for (i = 0; i < roster.length; i++) {
            player = roster[i];
            if (
                player.player.eligiblePositions.includes("RB/WR/TE") &&
                (typeof flex.totalPoints == "undefined" ||
                    player.totalPoints > flex.totalPoints)
            ) {
                if (
                    player.player.id != wr1.player.id &&
                    player.player.id != wr2.player.id &&
                    player.player.id != rb1.player.id &&
                    player.player.id != rb2.player.id &&
                    player.player.id != te.player.id
                ) {
                    //console.log("Adding " + roster[i].player.fullName + " as FLEX with score of " + player.totalPoints);
                    flex = player;
                }
            }
        }

        /*console.log("Optimal lineup: ");
      console.log("QB: " + qb.player.fullName + " " + qb.totalPoints);
      console.log("RB1: " + rb1.player.fullName + " " + rb1.totalPoints);
      console.log("RB2: " + rb2.player.fullName + " " + rb2.totalPoints);
      console.log("WR1: " + wr1.player.fullName + " " + wr1.totalPoints);
      console.log("WR2: " + wr2.player.fullName + " " + wr2.totalPoints);
      console.log("TE: " + te.player.fullName + " " + te.totalPoints);
      console.log("FLEX: " + flex.player.fullName + " " + flex.totalPoints);
      console.log("D/ST: " + defense.player.fullName + " " + defense.totalPoints);
      console.log("K: " + kicker.player.fullName + " " + kicker.totalPoints);*/
        var total =
            qb.totalPoints +
            rb1.totalPoints +
            rb2.totalPoints +
            wr1.totalPoints +
            wr2.totalPoints +
            te.totalPoints +
            flex.totalPoints +
            kicker.totalPoints +
            defense.totalPoints;
        //console.log("Total: " + total);
        return total;
    }
}
