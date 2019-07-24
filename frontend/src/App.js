import React, {useState, useEffect} from 'react';
import * as moment from 'moment';

import nextArrival from './ArrivalTimes';
const stops = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const App = () => {
	const [time, setTime] = useState(moment());
	const [active, setActive] = useState([]);
	let date = moment().format('MMMM D, YYYY');

	useEffect(() => {
		let id = setInterval(() => setTime(moment()), 1000);
		return () => clearInterval(id);
	}, []);

	return (
		<div>
			<div>{date}</div>
			<div>{time.format('h:mm:ss a')}</div>
			<div>Choose which stops you would like to see</div>
			{stops.map((stop, i) => (
				<button
					key={i}
					onClick={() => {
						if (!active.find(i => i === stop))
							setActive(
								[...new Set([...active, stop])].sort(
									(a, b) => a - b
								)
							);
						else setActive([...active.filter(i => i !== stop)]);
					}}>
					{stop}
				</button>
			))}

			{active.map((stop, i) => (
				<div key={i}>
					Stop {stop}:
					{Object.values(
						nextArrival[Number(time.format('mm')) % 15][stop]
					).map((bus, j) => (
						<div key={j}>
							Route {j + 1} arriving{' '}
							{!bus[0]
								? `now and in ${bus[1]} mins`
								: `in: ${bus[0]} mins and ${bus[1]} mins`}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default App;
