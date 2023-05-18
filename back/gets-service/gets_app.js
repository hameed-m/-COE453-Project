const express = require('express');
const { getAllTeams, getAllPlayers, getTeam, getPlayer } = require('./gets_database');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => res.send("<h1>Hello to KFUPM Tournaments API</h1>") );

// Team routes
app.get('/teams', async (req, res) => {
    const teams = await getAllTeams();
    res.send(teams);
});

app.get('/teams/:name', async (req, res) => {
    const teamName = req.params.name;
    const team = await getTeam(teamName);

    res.send(team);
});

// Player routes
app.get('/players', async (req, res) => {
    const players_list = await getAllPlayers();
    res.send(players_list);
});

app.get('/players/:name', async (req, res) => {
    const playerName = req.params.name;
    const player = await getPlayer(playerName);

    res.send(player);
});
  
// Launch server
app.listen(8080, () => {
    console.log('App listening on port 8080');
});

