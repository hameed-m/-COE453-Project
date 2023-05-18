const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const {
	getAllTeams,
	getAllPlayers,
	getTeam,
	getPlayer,
	createTeam,
	createPlayer,
	deleteTeam,
	deletePlayer,
} = require("./graphql_database");
const cors = require("cors");

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
  }

  type Query {
    players: [Player]
    teams: [Team]
    team(name: String): Team
    player(name: String): Player
  }

  input TeamInput {
    Name: String
    Rank: Int
    MatchesPlayed: Int
    Goals: Int
  }

  input PlayerInput {
    Name: String
    Age: Int
    MatchesPlayed: Int
    Goals: Int
    RedCards: Int
    YellowCards: Int
    Team: String
  }

  type Mutation {
    addTeam(input: TeamInput): Team
    deleteTeam(Name: String): Boolean
    addPlayer(input: PlayerInput): Player
    deletePlayer(Name: String): Boolean
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
	},
  addTeam: async ({ input }) => {
    return await createTeam(input);
  },
  addPlayer: async ({ input }) => {
    return await createPlayer(input);
  },
  deleteTeam: async ({ name }) => {
    return await deleteTeam(name);
  },
  deletePlayer: async ({ name }) => {
    return await deletePlayer(name);
  }
};

const app = express();

app.use(cors());

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema, 
    root: root,
    graphiql: true
	})
);

app.use(express.json());

app.listen(8080, () => {
  console.log("I am listening at port 8080");
});