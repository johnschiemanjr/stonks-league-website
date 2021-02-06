const {
  Client,
  Player,
  BoxscorePlayer,
} = require("espn-fantasy-football-api/node-dev");
const fs = require("fs");
const axios = require("axios");
const year = 2020;

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

  for (var week = 1; week < 17; week++) {
    const boxScores = require("../../data/" +
      year +
      "/raw_boxscores/week" +
      week +
      "BoxScore.json");
    // object to upload to database

    for (
      var scoreboardIndex = 0;
      scoreboardIndex < boxScores.length;
      scoreboardIndex++
    ) {
      var dbBoxscore = new Object();
      dbBoxscore.homeTeamId = boxScores[scoreboardIndex].homeTeamId;
      if (!boxScores[scoreboardIndex].awayTeamId) {
        // assume this is a bye week
        dbBoxscore.awayTeamId = -1;
      } else {
        dbBoxscore.awayTeamId = boxScores[scoreboardIndex].awayTeamId;
      }
      dbBoxscore.year = year;
      dbBoxscore.week = week;

      const homeRoster = boxScores[scoreboardIndex].homeRoster;
      const awayRoster = boxScores[scoreboardIndex].awayRoster;

      var homeRosterDb = [];
      var awayRosterDb = [];
      var j;
      for (j = 0; j < homeRoster.length; j++) {
        const player = homeRoster[j];
        homeRosterDb.push({
          name: player.player.fullName,
          slot: player.position,
          points: player.totalPoints,
          eligibility: player.player.eligiblePositions.filter(filterPositions),
        });
      }
      for (j = 0; j < awayRoster.length; j++) {
        const player = awayRoster[j];
        awayRosterDb.push({
          name: player.player.fullName,
          slot: player.position,
          points: player.totalPoints,
          eligibility: player.player.eligiblePositions.filter(filterPositions),
        });
      }

      dbBoxscore.homeRoster = homeRosterDb;
      dbBoxscore.awayRoster = awayRosterDb;

      axios
        .post("http://localhost:5000/boxscores/add", dbBoxscore)
        .then((res) => console.log(res.data));
    }

    // const data = JSON.stringify(week);
    // fs.writeFile(
    //   "../../data/2020/parsed_box_scores/week" + x + ".json",
    //   data,
    //   (err) => {
    //     if (err) {
    //       throw err;
    //     }
    //     console.log("JSON data is saved.");
    //   }
    // );
  }
});

function filterPositions(position) {
  if (position == "WR/TE") {
    return false;
  } else if (position == "RB/WR") {
    return false;
  } else if (position == "OP") {
    return false;
  } else if (!position) {
    return false;
  } else if (position == "Bench") {
    return false;
  } else if (position == "IR") {
    return false;
  } else {
    return true;
  }
}
