const {
  Client,
  Player,
  BoxscorePlayer,
} = require("espn-fantasy-football-api/node-dev"); // node
const fs = require("fs");

const myClient = new Client({ leagueId: 67314407 });
myClient.setCookies({
  espnS2:
    "AEATzuQ5w%2BLF2xa3J5nYQbAoVEI2lZLepwfdwWMByZHVXrwNNISZ7DRD%2F7%2Bh2IM6jF70xy5YHWkgFaEoOLNPVMKnGxc1VY7c%2Fmp7mBSUS7lOs57%2Fd%2BHOyyclueIrg7tXyFhBReTcPgbpOinAHAs%2FsQRbkZ2aGZb1871QXitSooyGw1Sx%2BBjrkLujHcJz9dTIUiJNwlmE83r%2BuR9epedwEbE%2Bw2T2sD1GdU6V4xzFg3JbzjqxwPsttyWGBpJYPT8soz%2BwrFDmeU7IKF71MufsQnqm",
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
