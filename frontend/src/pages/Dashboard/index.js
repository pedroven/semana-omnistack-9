import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Dashboard() {

	const [spots, setSpots] = useState([]);

	useEffect(() => {
		async function getSpots() {
			const user_id = localStorage.getItem('user');
			const response = await api.get('/dashboard', {
				headers: {
					user_id
				}
			});
			setSpots(response.data);
		}
		getSpots();
	}, []);

	return (
		<>
			<ul className="spot-list">
				{spots.map((spot) => (
					<li key={spot._id}>
						<header></header>
						<strong>{spot.company}</strong>
						<span>{spot.price}</span>
					</li>
				))}
			</ul>
		</>
	);
}
