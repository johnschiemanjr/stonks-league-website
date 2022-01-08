const axios = require("axios");
const sleeperConverter = require("./sleeperConverter");

const YEAR = 2021;
const winnersBracket = require("../../data/" +
    YEAR +
    "/league_winners_bracket.json");

//console.log(winnersBracket);

let week1Matchups = winnersBracket.filter((matchup) => {
    return matchup.r === 1;
});
let week2Matchups = winnersBracket.filter((matchup) => {
    return matchup.r === 2;
});
let week3Matchups = winnersBracket.filter((matchup) => {
    return matchup.r === 3;
});

console.log(week1Matchups);
