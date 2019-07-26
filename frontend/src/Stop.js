import React from 'react';
import nextArrival from './ArrivalTimes';

const Stop = props => {
	let {time, stop} = props;
	return (
		<div>
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
	);
};

export default Stop;
