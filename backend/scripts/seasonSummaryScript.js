const axios = require("axios");

const YEAR = 2020;
const FIRST_PLACE = 1;
const SECOND_PLACE = 2;
const LAST_PLACE = 12;

const teamJson = require("../../data/" + YEAR + "/team.json");
const teams = teamJson.teams;

var seasonSummary = new Object();
seasonSummary.year = YEAR;
seasonSummary.regularSeasonChampionId = -1;
seasonSummary.playoffsChampionId = -1;
seasonSummary.runnerUpId = -1;
seasonSummary.lastPlaceId = -1;

for (var i = 0; i < teams.length; i++) {
  const owner = teams[i];

  if (owner.rankCalculatedFinal === FIRST_PLACE) {
    seasonSummary.playoffsChampionId = owner.id;
  } else if (owner.rankCalculatedFinal === SECOND_PLACE) {
    seasonSummary.runnerUpId = owner.id;
  }

  if (owner.playoffSeed === FIRST_PLACE) {
    seasonSummary.regularSeasonChampionId = owner.id;
  } else if (owner.playoffSeed === LAST_PLACE) {
    seasonSummary.lastPlaceId = owner.id;
  }
}

axios
  .post("http://localhost:5000/season/add", seasonSummary)
  .then((res) => console.log(res.data));
