import React, { useState, useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";

const query = `
  query {
    teams {
      Name
      Rank
      MatchesPlayed
      Goals
    }
  }
`;

function Teams() {
	document.getElementById("teams-nav").setAttribute("class", "nav-link active");
	document.getElementById("players-nav").setAttribute("class", "nav-link");

	const [teams, setTeams] = useState([
		{
			id: 1,
			Name: "FC Barcelona",
			Rank: 1,
			MatchesPlayed: 8,
			Goals: 72,
		},
		{
			id: 2,
			Name: "Manchester United",
			Rank: 2,
			MatchesPlayed: 8,
			Goals: 65,
		},
		{
			id: 3,
			Name: "Paris Saint-Germain",
			Rank: 3,
			MatchesPlayed: 8,
			Goals: 56,
		},
	]);

	useEffect(() => {
		fetch("https://api-v4-7b48zlpr.ew.gateway.dev/teams")
			.then((response) => response.json())
			.then((teams) => {
				const newArray = [];
				for (let i = 0; i < teams.length; i++) {
					const obj = teams[i];
					obj.id = i + 1;
					newArray.push(obj);
				}

				setTeams(newArray);
			});
	}, [teams]);

	const handleDeleteTeam = (id) => {
		const name = teams.find((obj) => obj.id === id).Name;
		setTeams(teams.filter((team) => team.id !== id));
		fetch("https://api-v4-7b48zlpr.ew.gateway.dev/" + name, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	const handleAddTeam = () => {
		setTeams([
			...teams,
			{
				id: teams[teams.length - 1].id + 1,
				name: document.getElementById("nName").value,
				rank: document.getElementById("nRank").value,
				matchesPlayed: document.getElementById("nMatchesPlayed").value,
				goalsScored: document.getElementById("nGoalsScored").value,
			},
		]);

		const nTeam = JSON.stringify({
			Name: document.getElementById("nName").value,
			Rank: document.getElementById("nRank").value,
			MatchesPlayed: document.getElementById("nMatchesPlayed").value,
			Goals: document.getElementById("nGoalsScored").value,
		});

		fetch("https://api-v4-7b48zlpr.ew.gateway.dev/teams/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: nTeam,
		});
		document.getElementById("nName").value = "";
		document.getElementById("nRank").value = null;
		document.getElementById("nMatchesPlayed").value = null;
		document.getElementById("nGoalsScored").value = null;
	};

	return (
		<div>
			<h2>Teams</h2>
			<Table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Rank</th>
						<th>Matches Played</th>
						<th>Goals Scored</th>
					</tr>
				</thead>
				<tbody>
					{teams.map((team) => (
						<tr key={team.id}>
							<td>{team.id}</td>
							<td>{team.Name}</td>
							<td>{team.Rank}</td>
							<td>{team.MatchesPlayed}</td>
							<td>{team.Goals}</td>
							<td>
								<Button
									variant="danger"
									onClick={() => handleDeleteTeam(team.id)}
								>
									Delete
								</Button>
							</td>
						</tr>
					))}
					<tr>
						<td></td>
						<td>
							<Form.Control type="text" placeholder="Name" id="nName" />
						</td>
						<td>
							<Form.Control type="number" placeholder="Rank" id="nRank" />
						</td>
						<td>
							<Form.Control
								type="number"
								placeholder="Matches Played"
								id="nMatchesPlayed"
							/>
						</td>
						<td>
							<Form.Control
								type="number"
								placeholder="Goals Scored"
								id="nGoalsScored"
							/>
						</td>
						<td>
							<Button variant="success" onClick={handleAddTeam}>
								Add
							</Button>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}

export default Teams;
