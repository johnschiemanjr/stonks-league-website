const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
	console.log("MongoDB connection successfully established.");
});

const ownersRouter = require("./routes/owners");
const ownerOverviewRouter = require("./routes/owner-overview");
const boxscoresRouter = require("./routes/boxscores");
const seasonSummaryRouter = require("./routes/season-summary");

app.use("/owners", ownersRouter);
app.use("/ownerOverview", ownerOverviewRouter);
app.use("/boxscores", boxscoresRouter);
app.use("/seasons", seasonSummaryRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
