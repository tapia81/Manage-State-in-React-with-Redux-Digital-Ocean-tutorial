import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementBird, addBird } from './store/birds/birds';
import './App.css';

function App() {
	const [ birdName, setBird ] = useState('');
	const birds = [ ...useSelector((state) => state.birds) ].sort((a, b) => {
		return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
	});
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		if (birdName == '') {
			console.log('No Input Detected');
		} else {
			event.preventDefault();
			dispatch(addBird(birdName));
			setBird('');
		}
	};

	return (
		<div className="wrapper">
			<h1>Bird List</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<p>Add Bird</p>
					<input
						type="text"
						placeholder="Please Input Bird Type"
						onChange={(e) => setBird(e.target.value)}
						value={birdName}
					/>
				</label>
				<div>
					<button className="submit-btn" type="submit">
						Add
					</button>
				</div>
			</form>
			<ul>
				{birds.map((bird) => (
					<li key={bird.name}>
						<h3>{bird.name}</h3>
						<div>
							Views: {bird.views}
							<button className="btn" onClick={() => dispatch(incrementBird(bird.name))}>
								<span>➕</span>
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
