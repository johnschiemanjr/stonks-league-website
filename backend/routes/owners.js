const router = require("express").Router();
let Owner = require("../models/owner.model");

router.route("/").get((req, res) => {
    Owner.find()
        .then((owners) => res.json(owners))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const ownerId = req.body.ownerId;
    const teamName = req.body.teamName;
    const espnId = req.body.espnId;
    const ownerName = req.body.ownerName;

    const newOwner = new Owner({ ownerId, teamName, espnId, ownerName });

    newOwner
        .save()
        .then(() => res.json("Owner added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
