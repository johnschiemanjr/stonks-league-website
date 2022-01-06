const router = require("express").Router();
let SeasonSummary = require("../models/seasonSummary.model");

router.route("/").get((req, res) => {
	SeasonSummary.find()
		.then((seasons) => res.json(seasons))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:season").get((req, res) => {
	SeasonSummary.find({ year: req.params.season })
		.then((season) => res.json(season))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	const year = Number(req.body.year);
	const regularSeasonChampionId = Number(req.body.regularSeasonChampionId);
	const playoffsChampionId = Number(req.body.playoffsChampionId);
	const runnerUpId = Number(req.body.runnerUpId);
	const lastPlaceId = Number(req.body.lastPlaceId);
	const owners = req.body.owners;
	const divisions = req.body.divisions;

	const newSeasonSummary = new SeasonSummary({
		year,
		regularSeasonChampionId,
		playoffsChampionId,
		runnerUpId,
		lastPlaceId,
		divisions,
		owners,
	});

	newSeasonSummary
		.save()
		.then(() => res.json("Season summary added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
