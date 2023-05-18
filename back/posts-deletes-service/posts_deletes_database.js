const mongoose = require("mongoose");

const connectionString =
	"mongodb+srv://alghanmi:uJRdPyM7uRRUB0Yh@coe453-project.rcw9xq2.mongodb.net/SaudiPro_league";

mongoose.connect(connectionString);

// Players schema
const playerSchema = new mongoose.Schema({
	Name: {
		type: String,
		required: true,
	},

	Age: {
		type: Number,
		required: true,
	},

	MatchesPlayed: {
		type: Number,
		required: true,
	},

	Goals: {
		type: Number,
		required: true,
	},

	RedCards: {
		type: Number,
		required: true,
	},

	YellowCards: {
		type: Number,
		required: true,
	},
});

const Player = mongoose.model("Player", playerSchema);

// Teams schema
const teamSchema = new mongoose.Schema({
	Name: {
		type: String,
		required: true,
	},

	Rank: {
		type: Number,
		required: true,
	},

	MatchesPlayed: {
		type: Number,
		required: true,
	},

	Goals: {
		type: Number,
		required: true,
	},

	Players: {
		type: Array,
	},
});

const Team = mongoose.model("Team", teamSchema);

// Team queries
async function createTeam(team) {
	return new Team(team).save();
}

async function deleteTeam(name) {
	await Team.deleteOne({Name: name});
}

// Player queries
async function createPlayer(player) {
	return new Player(player).save();
}

async function deletePlayer(name) {
	await Player.deleteOne({Name: name});
}

module.exports = { createTeam, createPlayer, deleteTeam, deletePlayer };