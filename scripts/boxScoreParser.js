const {
    Client,
    Player,
    BoxscorePlayer,
} = require("espn-fantasy-football-api/node-dev");
const boxScores = require("../data/2020/raw_boxscores/week1BoxScore.json");

const myClient = new Client({ leagueId: 67314407 });
myClient.setCookies({
    espnS2:
        "AEATzuQ5w%2BLF2xa3J5nYQbAoVEI2lZLepwfdwWMByZHVXrwNNISZ7DRD%2F7%2Bh2IM6jF70xy5YHWkgFaEoOLNPVMKnGxc1VY7c%2Fmp7mBSUS7lOs57%2Fd%2BHOyyclueIrg7tXyFhBReTcPgbpOinAHAs%2FsQRbkZ2aGZb1871QXitSooyGw1Sx%2BBjrkLujHcJz9dTIUiJNwlmE83r%2BuR9epedwEbE%2Bw2T2sD1GdU6V4xzFg3JbzjqxwPsttyWGBpJYPT8soz%2BwrFDmeU7IKF71MufsQnqm",
    SWID: "{1686483F-1733-4E45-A4AF-BB88A4D6B3A9}",
});
const teams = myClient.getTeamsAtWeek({ seasonId: 2020, scoringPeriodId: 0 });

teams.then(function (result) {
    var ownerMap = new Map();
    var i;
    for (i = 0; i < result.length; i++) {
        ownerMap.set(result[i].id, {
            name: result[i].name,
        });
    }

    console.log("Home team " + ownerMap.get(boxScores[0].homeTeamId).name);
    console.log("Away team " + ownerMap.get(boxScores[0].awayTeamId).name);
    const homeRoster = boxScores[0].homeRoster;
    const awayRoster = boxScores[0].awayRoster;

    var j;
    for (j = 0; j < homeRoster.length; j++) {
        const player = homeRoster[j];
        console.log(
            player.player.fullName +
                " slotted at " +
                player.position +
                " scored " +
                player.totalPoints
        );
    }
});
