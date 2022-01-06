const axios = require("axios");
const teams = require("../../data/2021/league_users.json");
const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});

var owners = [];

const requestString =
  "https://api.sleeper.app/v1/league/" +
  process.env.SLEEPER_LEAGUE_ID +
  "/users/";
axios
  .get(requestString)
  .then((response) => {
    postOwners(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

function postOwners(owners) {
  for (let i = 0; i < owners.length; i++) {
    var owner = new Object();
    owner.ownerId = owners[i].user_id;
    owner.teamName = owners[i].metadata.team_name;
    if (!owner.teamName) {
      owner.teamName = "Team " + owners[i].display_name;
    }
    axios
      .post("http://localhost:5000/owners/add", owner)
      .then((res) => console.log(res.data))
      .catch((error) => {
        throw error;
      });
  }
}
