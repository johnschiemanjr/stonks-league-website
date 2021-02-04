const {
  Client,
  Player,
  BoxscorePlayer,
} = require("espn-fantasy-football-api/node-dev");
const fs = require("fs");

const myClient = new Client({ leagueId: 67314407 });
myClient.setCookies({
  espnS2:
    "***REMOVED***",
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

  for (var x = 1; x < 17; x++) {
    const boxScores = require("../../data/2020/raw_boxscores/week" +
      x +
      "BoxScore.json");
    // object to upload to database
    var week = new Object();
    week.year = 2020;
    week.weekId = x;
    week.boxScores = [];

    for (var k = 0; k < boxScores.length; k++) {
      const homeRoster = boxScores[k].homeRoster;
      const awayRoster = boxScores[k].awayRoster;

      var homeRosterDb = [];
      var awayRosterDb = [];
      var j;
      for (j = 0; j < homeRoster.length; j++) {
        const player = homeRoster[j];
        homeRosterDb.push({
          name: player.player.fullName,
          slot: player.position,
          points: player.totalPoints,
        });
      }
      for (j = 0; j < awayRoster.length; j++) {
        const player = awayRoster[j];
        awayRosterDb.push({
          name: player.player.fullName,
          slot: player.position,
          points: player.totalPoints,
        });
      }

      week.boxScores.push({
        homeTeamId: boxScores[k].homeTeamId,
        awayTeamId: boxScores[k].awayTeamId,
        homeRoster: homeRosterDb,
        awayRoster: awayRosterDb,
      });
    }

    console.log(week);

    const data = JSON.stringify(week);
    fs.writeFile(
      "../../data/2020/parsed_box_scores/week" + x + ".json",
      data,
      (err) => {
        if (err) {
          throw err;
        }
        console.log("JSON data is saved.");
      }
    );
  }
});