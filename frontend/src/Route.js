import React from 'react';

const Route = props => {
	let {bus} = props;

	return (
		<div>
			Route {bus.route} arriving{' '}
			{!bus.arrivals[0]
				? `now and in ${bus.arrivals[1]} mins`
				: `in: ${bus.arrivals[0]} mins and ${bus.arrivals[1]} mins`}
		</div>
	);
};
export default Route;
