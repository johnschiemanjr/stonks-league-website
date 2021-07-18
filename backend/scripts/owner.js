const axios = require("axios");
const teams = require("../../data/2020/team.json");

var owners = [];
for (var i = 0; i < teams.teams.length; i++) {
  var owner = new Object();
  owner.ownerId = teams.teams[i].id;
  owner.teamName = teams.teams[i].location + " " + teams.teams[i].nickname;
  owner.espnId = teams.teams[i].primaryOwner;

  for (var j = 0; j < teams.members.length; j++) {
    if (teams.members[j].id === teams.teams[i].primaryOwner) {
      owner.ownerName =
        teams.members[j].firstName + " " + teams.members[j].lastName;
    }
  }

  owners.push(owner);

  axios
    .post("http://localhost:5000/owners/add", owner)
    .then((res) => console.log(res.data))
    .catch((error) => {
      throw error;
    });
}

console.log(owners);
