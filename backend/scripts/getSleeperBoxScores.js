const axios = require("axios");
const path = require("path");
require("dotenv").config({
    path: path.resolve("../.env"),
});
const fs = require("fs");
const year = 2022;

console.log("Getting data...");

for (let week = 1; week < 4; week++) {
    let requestString =
        "https://api.sleeper.app/v1/league/" +
        process.env.SLEEPER_LEAGUE_ID_2022 +
        "/matchups/" +
        String(week);
    axios
        .get(requestString)
        .then((response) => {
            fs.writeFile(
                "../../data/" +
                    year +
                    "/raw_boxscores/week" +
                    week +
                    "BoxScore.json",
                JSON.stringify(response.data),
                "utf8",
                function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                }
            );
        })
        .catch((error) => {
            console.log(error);
        });
}
