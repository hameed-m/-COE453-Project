const express = require('express');
const { createTeam, createPlayer, deleteTeam, deletePlayer } = require('./posts_deletes_database');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// Team routes
app.post('/teams/add', async (req, res) => {
    const team = await createTeam(req.body);
    res.send(req.body);
  });
  
  app.delete('/teams/:name', async (req, res) => {
    const teamName = req.params.name;
    await deleteTeam(teamName);
  
    res.send('Team deleted successfully');
  });


  // Player routes
  app.post('/players/add', async (req, res) => {
    const player = await createPlayer(req.body);
    res.send(req.body);
  });
  
  app.delete('/players/:name', async (req, res) => {
    const playerName = req.params.name;
    await deletePlayer(playerName);
  
    res.send('Player deleted successfully');
  });

  // Launch server
app.listen(8080, () => {
    console.log('App listening on port 8080');
  });
  