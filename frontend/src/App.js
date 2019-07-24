import React, {useState, useEffect} from 'react';
import * as moment from 'moment';

import nextArrival from './ArrivalTimes';
const stations = [1, 2];

const App = () => {
	const [time, setTime] = useState(moment());
	let date = moment().format('MMMM D, YYYY');

	useEffect(() => {
		let id = setInterval(() => setTime(moment()), 1000);
		return () => clearInterval(id);
	}, []);

	return (
		<div>
			<div>{date}</div>
			<div>{time.format('h:mm:ss a')}</div>
			{stations.map((stop, i) => (
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
