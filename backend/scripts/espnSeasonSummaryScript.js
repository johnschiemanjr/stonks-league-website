const axios = require("axios");

const YEAR = 2020;
const FIRST_PLACE = 1;
const SECOND_PLACE = 2;
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
  //console.log(owner);

  seasonSummary.owners.push({
    ownerId: owner.id,
    wins: owner.record.overall.wins,
    losses: owner.record.overall.losses,
    ties: owner.record.overall.ties,
    divisionWins: owner.record.division.wins,
    divisionLosses: owner.record.division.losses,
    divisionTies: owner.record.division.ties,
    pointsFor: owner.record.overall.pointsFor,
    pointsAgainst: owner.record.overall.pointsAgainst,
    seasonRank: owner.playoffSeed,
    divisionId: owner.divisionId,
  });

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

seasonSummary.divisions = new Object();
seasonSummary.divisions = divisions;
//console.log(seasonSummary);

axios
  .put("http://localhost:5000/seasons/update/" + "2022", seasonSummary)
  .then((res) => console.log(res.data))
  .catch((error) => {
    throw error;
  });
