const router = require("express").Router();
let Boxscore = require("../models/boxscore.model");
let OwnerOverview = require("../models/ownerOverview.model");

router.route("/:ownerId").get((req, res) => {
	OwnerOverview.find({ ownerId: req.params.ownerId })
		.then((ownerOverview) => res.json(ownerOverview[0]))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get((req, res) => {
	OwnerOverview.find()
		.then((overviews) => res.json(overviews))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	let ownerId = req.body.ownerId;
	let teamName = req.body.teamName;
	let regWins = req.body.regWins;
	let regLosses = req.body.regLosses;
	let regTies = req.body.regTies;
	let playoffWins = req.body.playoffWins;
	let playoffLosses = req.body.playoffLosses;
	let playoffTies = req.body.playoffTies;
	let totalWins = req.body.totalWins;
	let totalLosses = req.body.totalLosses;
	let totalTies = req.body.totalTies;
	let totalPct = req.body.totalPct;
	let highScore = req.body.highScore;
	let lowScore = req.body.lowScore;
	let bestWin = req.body.bestWin;
	let worstLoss = req.body.worstLoss;
	let closestWin = req.body.closestWin;
	let closestLoss = req.body.closestLoss;
	let totalPoints = req.body.totalPoints;
	let totalPointsAgainst = req.body.totalPointsAgainst;
	let streak = req.body.streak;
	let seasons = req.body.seasons;
	let averagePoints = req.body.averagePoints;
	let averagePointsAgainst = req.body.averagePointsAgainst;

	const newOwnerOverview = new OwnerOverview({
		ownerId,
		teamName,
		regWins,
		regLosses,
		regTies,
		playoffWins,
		playoffLosses,
		playoffTies,
		totalWins,
		totalLosses,
		totalTies,
		totalPct,
		highScore,
		lowScore,
		bestWin,
		worstLoss,
		closestWin,
		closestLoss,
		totalPoints,
		totalPointsAgainst,
		streak,
		seasons,
		averagePoints,
		averagePointsAgainst,
	});

	console.log(newOwnerOverview);

	newOwnerOverview
		.save()
		.then(() => res.json("Owner overview added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
