const axios = require("axios");
const year = 2020;
const playoffBoxscores = require("../../data/" + year + "/matchupScore.json");

// Loop through weeks to add boxscores
for (var week = 1; week < 17; week++) {
  const boxScores = require("../../data/" +
    year +
    "/raw_boxscores/week" +
    week +
    "BoxScore.json");

  // Loop through each scoreboard in the week
  for (
    var scoreboardIndex = 0;
    scoreboardIndex < boxScores.length;
    scoreboardIndex++
  ) {
    // Set up boxscore object to be pushed to database
    var dbBoxscore = new Object();
    dbBoxscore.homeTeamId = boxScores[scoreboardIndex].homeTeamId;
    if (!boxScores[scoreboardIndex].awayTeamId) {
      // this is a bye week
      dbBoxscore.awayTeamId = -1;
    } else {
      dbBoxscore.awayTeamId = boxScores[scoreboardIndex].awayTeamId;
    }
    dbBoxscore.year = year;
    dbBoxscore.week = week;

    // Get raw rosters
    const homeRoster = boxScores[scoreboardIndex].homeRoster;
    const awayRoster = boxScores[scoreboardIndex].awayRoster;

    // Set up rosters that will be posted to database
    var homeRosterDb = [];
    var awayRosterDb = [];

    // Loop through raw rosters and add player to database roster
    for (var j = 0; j < homeRoster.length; j++) {
      const player = homeRoster[j];
      homeRosterDb.push({
        name: player.player.fullName,
        slot: player.position,
        points: player.totalPoints,
        eligibility: player.player.eligiblePositions.filter(filterPositions),
      });
    }
    for (var j = 0; j < awayRoster.length; j++) {
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

    // Loop through each matchup to determine the playoff status
    for (var k = 0; k < playoffBoxscores.schedule.length; k++) {
      if (!("away" in playoffBoxscores.schedule[k])) {
        // A bye week, so no playoff status needed
        continue;
      }
      if (
        playoffBoxscores.schedule[k].home.teamId == dbBoxscore.homeTeamId &&
        playoffBoxscores.schedule[k].away.teamId == dbBoxscore.awayTeamId &&
        playoffBoxscores.schedule[k].matchupPeriodId == dbBoxscore.week
      ) {
        // No need to add status if it's a regular season game
        if (playoffBoxscores.schedule[k].playoffTierType != "NONE") {
          dbBoxscore.playoffStatus =
            playoffBoxscores.schedule[k].playoffTierType;
        }
        break;
      }
    }

    // Post boxscore to database
    axios
      .post("http://localhost:5000/boxscores/add", dbBoxscore)
      .then((res) => console.log(res.data));
  } // End of loop through each scoreboard of the week
} // End of loop through weeks

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
