const {
  Client,
  Player,
  BoxscorePlayer,
} = require("espn-fantasy-football-api/node-dev"); // node
const fs = require("fs");

const myClient = new Client({ leagueId: 67314407 });
myClient.setCookies({
  espnS2:
    "***REMOVED***",
  SWID: "{1686483F-1733-4E45-A4AF-BB88A4D6B3A9}",
});

const freeAgents = myClient.getFreeAgents({
  seasonId: 2020,
  scoringPeriodId: 2,
});

freeAgents.then(function (result) {
  const data = JSON.stringify(result);

  // write JSON string to a file
  fs.writeFile("scoringPeriod2FreeAgents.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
});
