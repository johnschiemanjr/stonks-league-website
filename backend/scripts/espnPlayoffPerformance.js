const axios = require("axios");
const sleeperConverter = require("./sleeperConverter");

const YEAR = 2020;
const FIRST_PLACE = 1;
const SECOND_PLACE = 2;
const APPEARANCE = 7;
const LAST_PLACE = 12;

const teamJson = require("../../data/" + YEAR + "/team.json");
const settingsJson = require("../../data/" + YEAR + "/settings.json");
const divisions = settingsJson.settings.scheduleSettings.divisions;
const teams = teamJson.teams;

var seasonSummary = new Object();
seasonSummary.year = YEAR;
seasonSummary.regularSeasonChampionId = -1;
seasonSummary.playoffsChampionId = -1;
seasonSummary.runnerUpId = -1;
seasonSummary.lastPlaceId = -1;
seasonSummary.owners = [];

for (let i = 0; i < teams.length; i++) {
  const owner = teams[i];

  let performance = new Object();
  performance.ownerId = sleeperConverter.oldIdToSleeper(owner.id);
  performance.wins = 0;
  performance.losses = 0;
  performance.ties = 0;
  performance.appearances = 0;
  performance.championships = 0;
  performance.runnerups = 0;

  if (owner.rankCalculatedFinal < APPEARANCE) {
    performance.appearances++;
    if (owner.rankCalculatedFinal === FIRST_PLACE) {
      performance.championships++;
    } else if (owner.rankCalculatedFinal === SECOND_PLACE) {
      performance.runnerups++;
    }
  }

  let requestString =
    "http://localhost:5000/boxscores/ownerId/" + String(performance.ownerId);
  axios
    .get(requestString)
    .then((response) => {
      let result = response.data.filter((boxscore) => {
        return boxscore.playoffStatus === "WINNERS_BRACKET";
      });
      if (result.length === 0) {
        performance.wins = 0;
        performance.losses = 0;
        performance.ties = 0;
      } else {
        calculateRecord(performance, result);
      }

      postPerformance(performance);
    })
    .catch((error) => {
      console.log(error);
    });
}

function calculateScore(roster) {
  let score = 0;
  for (let i = 0; i < roster.length; i++) {
    const position = roster[i].slot;
    if (position !== "Bench" && position !== "IR") {
      score += roster[i].points;
    }
  }
  return score;
}

function calculateRecord(performance, games) {
  for (let i = 0; i < games.length; i++) {
    let boxscore = games[i];
    let ownerRoster;
    let opposingRoster;
    let OPPOSING_OWNER_ID;
    if (boxscore.homeTeamId === performance.ownerId) {
      ownerRoster = boxscore.homeRoster;
      opposingRoster = boxscore.awayRoster;
      OPPOSING_OWNER_ID = boxscore.awayTeamId;
    } else {
      ownerRoster = boxscore.awayRoster;
      opposingRoster = boxscore.homeRoster;
      OPPOSING_OWNER_ID = boxscore.homeTeamId;
    }

    const ownerScore = calculateScore(ownerRoster);
    const opposingScore = calculateScore(opposingRoster);
    const matchupMargin = ownerScore - opposingScore;

    if (matchupMargin > 0) {
      performance.wins++;
    } else if (matchupMargin < 0) {
      performance.losses++;
    } else {
      performance.ties++;
    }
  }
}

function postPerformance(performance) {
  let requestString =
    "http://localhost:5000/playoffPerformance/" + String(performance.ownerId);
  axios
    .get(requestString)
    .then((response) => {
      if (response.data.length === 0) {
        axios
          .post("http://localhost:5000/playoffPerformance/add", performance)
          .then((res) => console.log(res.data))
          .catch((error) => {
            throw error;
          });
      } else {
        updateAndPut(performance, response.data[0]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateAndPut(performanceToAdd, existingPerformance) {
  existingPerformance.wins += performanceToAdd.wins;
  existingPerformance.losses += performanceToAdd.losses;
  existingPerformance.ties += performanceToAdd.ties;
  existingPerformance.appearances += performanceToAdd.appearances;
  existingPerformance.championships += performanceToAdd.championships;
  existingPerformance.runnerups += performanceToAdd.runnerups;

  axios
    .put(
      "http://localhost:5000/playoffPerformance/update/" +
        existingPerformance.ownerId,
      existingPerformance
    )
    .then((res) => console.log(res.data))
    .catch((error) => {
      throw error;
    });
}
