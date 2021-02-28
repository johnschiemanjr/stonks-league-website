const {
  Client,
  Player,
  BoxscorePlayer,
} = require("espn-fantasy-football-api/node-dev"); // node
const fs = require("fs");

const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});

const myClient = new Client({ leagueId: process.env.LEAGUE_ID });
myClient.setCookies({
  espnS2: process.env.ESPN_S2,
  SWID: process.env.SWID,
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
