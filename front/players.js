import React, { useState, useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";

function Players() {
	document.getElementById("teams-nav").setAttribute("class", "nav-link");
	document.getElementById("players-nav").setAttribute("class", "nav-link active");
	
	const [players, setPlayers] = useState([
		{
			id: 1,
			name: "Lionel Messi",
			age: 39,
			matchesPlayed: 23,
			goalsScored: 700,
			redCards: 1,
			yellowCards: 3,
			team: "FC Barcelona",
		},
		{
			id: 2,
			name: "Cristiano Ronaldo",
			age: 39,
			matchesPlayed: 23,
			goalsScored: 800,
			redCards: 1,
			yellowCards: 3,
			team: "Manchester United",
		},
		{
			id: 3,
			name: "Neymar Jr.",
			age: 39,
			matchesPlayed: 23,
			goalsScored: 600,
			redCards: 1,
			yellowCards: 3,
			team: "Paris Saint-Germain",
		},
	]);

	useEffect(() => {
		fetch("https://api-v4-7b48zlpr.ew.gateway.dev/players")
		.then((response) => response.json())
		.then((players) => {
			const newArray = [];
			for (let i = 0; i < players.length; i++) {
				const obj = players[i];
				obj.id = i + 1;
				newArray.push(obj);
			}

			setPlayers(newArray);
		});
	}, [players]);

	const handleDeletePlayer = (id) => {
		const name = players.find((obj) => obj.id === id).Name;
		setPlayers(players.filter((player) => player.id !== id));
		fetch("https://api-v4-7b48zlpr.ew.gateway.dev/players/" + name, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	const handleAddPlayer = (event) => {
		setPlayers([
			...players,
			,
			{
				id: players[players.length - 1]["id"] + 1,
				Name: document.getElementById("nName").value,
				Age: document.getElementById("nAge").value,
				MatchesPlayed: document.getElementById("nMatchesPlayed").value,
				Goals: document.getElementById("nGoalsScored").value,
				RedCards: document.getElementById("nRedCards").value,
				YellowCards: document.getElementById("nYellowCards").value,
				Team: document.getElementById("nTeam").value,
			},
		]);

		const nPlayer = JSON.stringify({
			Name: document.getElementById("nName").value,
			Age: document.getElementById("nAge").value,
			MatchesPlayed: document.getElementById("nMatchesPlayed").value,
			Goals: document.getElementById("nGoalsScored").value,
			RedCards: document.getElementById("nRedCards").value,
			YellowCards: document.getElementById("nYellowCards").value,
			Team: document.getElementById("nTeam").value,
		});

		fetch("https://api-v4-7b48zlpr.ew.gateway.dev/players/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: nPlayer,
		});

		document.getElementById("nName").value = null;
		document.getElementById("nAge").value = null;
		document.getElementById("nMatchesPlayed").value = null;
		document.getElementById("nGoalsScored").value = null;
		document.getElementById("nRedCards").value = null;
		document.getElementById("nYellowCards").value = null;
		document.getElementById("nTeam").value = null;
		
	};

	return (
		<div className="container">
			<h2>Players</h2>
			<div className="row">
				<div className="col-12">
					<Table>
						<thead>
							<tr>
								<th className="col-20 px-2">ID</th>
								<th className="col-20 px-2">Name</th>
								<th>Age</th>
								<th>Matches Played</th>
								<th>Goals Scored</th>
								<th>Red Cards</th>
								<th>Yellow Cards</th>
								<th>Team</th>
							</tr>
						</thead>
						<tbody>
							{players.map((player) => (
								<tr key={player.id}>
									<td>{player.id}</td>
									<td>{player.Name}</td>
									<td>{player.Age}</td>
									<td>{player.MatchesPlayed}</td>
									<td>{player.Goals}</td>
									<td>{player.RedCards}</td>
									<td>{player.YellowCards}</td>
									<td>{player.Team}</td>
									<td>
										<Button
											variant="danger"
											onClick={() => handleDeletePlayer(player.id)}
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
									<Form.Control type="number" placeholder="Age" id="nAge" />
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
									<Form.Control
										type="number"
										placeholder="Red Cards"
										id="nRedCards"
									/>
								</td>
								<td>
									<Form.Control
										type="number"
										placeholder="Yellow Cards"
										id="nYellowCards"
									/>
								</td>
								<td>
									<Form.Control type="text" placeholder="Team" id="nTeam" />
								</td>
								<td>
									<Button variant="success" onClick={handleAddPlayer}>
										Add
									</Button>
								</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</div>
		</div>
	);
}

export default Players;
