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
async function getAllTeams() {
  const teams = await Team.find().select('-_id');
	return teams;
}

async function getTeam(name) {
  return await Team.findOne({"Name": name}).select('-_id');
}

async function createTeam(team) {
	return new Team(team).save();
}

async function deleteTeam(name) {
	await Team.deleteOne({Name: name});
}

// Player queries
async function getAllPlayers() {
	return await Player.find().select('-_id');
}

async function getPlayer(name) {
	return await Player.findOne({Name: name}).select('-_id');
}

async function createPlayer(player) {
	return new Player(player).save();
}

async function deletePlayer(name) {
	await Player.deleteOne({Name: name});
}

module.exports = { getAllTeams, getAllPlayers, getTeam, getPlayer, createTeam, createPlayer, deleteTeam, deletePlayer };


// new Team({
// 	Name: "AlFateh",
// 	Rank: 5,
// 	MatchesPlayed: 5,
// 	Goals: 10,
// }).save();

// player01.save().then(() => console.log("Saved!"));

