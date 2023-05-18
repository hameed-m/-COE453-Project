const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require("express-graphql");
const { getAllTeams, getAllPlayers, getTeam, getPlayer, createTeam, createPlayer, deleteTeam, deletePlayer } = require('./database');
const cors = require('cors');

const app = express();

// GraphQL schema
const schema = buildSchema(`
  type Player {
    Name: String
    Age: Int
    MatchesPlayed: Int
    Goals: Int
    RedCards: Int
    YellowCards: Int
    Team: String
  }

  type Team {
    Name: String
    Rank: Int
    MatchesPlayed: Int
    Goals: Int
    Players: [Player]
  }

  type Query {
    players: [Player]
    teams: [Team]
    team(name: String): Team
    player(name: String): Player
  }
`);

const root = {
  players: async () => {
    return await getAllPlayers();
  },
  teams: async () => {
    return await getAllTeams();
  },
  team: async ({ name }) => {
    return await getTeam(name);
  },
  player: async ({ name }) => {
    return await getPlayer(name);
  }
}

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>Hello to KFUPM Tournaments API</h1>");
  });

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
app.get('/players', async (req, res) => {
  const players_list = await getAllPlayers();
  res.send(players_list);
});

app.get('/players/:name', async (req, res) => {
  const playerName = req.params.name;
  const player = await getPlayer(playerName);

  res.send(player);
});

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










// app.delete('/teams/:id', (req, res) => {
//   const teamId = req.params.id;

//   database.deleteTeam(teamId);

//   res.send('Team deleted successfully');
// });

// app.put('/teams/:id', (req, res) => {
//   const teamId = req.params.id;

//   const teamData = req.body;

//   database.updateTeam(teamId, teamData);

//   res.send('Team updated successfully');
// });