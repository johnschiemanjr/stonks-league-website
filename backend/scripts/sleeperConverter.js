module.exports = {
    oldIdToSleeper: function (oldId) {
        if (oldId == 5) {
            return "475389274678620160";
        } else if (oldId == 1) {
            return "718800178789810176";
        } else if (oldId == 7) {
            return "720314500653350912";
        } else if (oldId == 3) {
            return "737840490904494080";
        } else if (oldId == 2) {
            return "737841862324477952";
        } else if (oldId == 6) {
            return "737842319956561920";
        } else if (oldId == 10) {
            return "737957144900562944";
        } else if (oldId == 11) {
            return "738067067693137920";
        } else if (oldId == 8) {
            return "738069258206109696";
        } else if (oldId == 4) {
            return "738082152499007488";
        } else if (oldId == 12) {
            return "738200788433788928";
        } else if (oldId == 9) {
            return "738824204790722560";
        }
    },
    rosterIdToUserId: function (year, rosterId) {
        const teamInfo = require("../../data/" +
            year +
            "/league_team_info.json");
        var team = teamInfo.filter((team) => {
            return team.roster_id === rosterId;
        });

        return team[0].owner_id;
    },
};
