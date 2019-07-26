import React from 'react';
import * as moment from 'moment';

const stops = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Header = props => {
	let {time, active, setActive} = props;
	let date = moment().format('MMMM D, YYYY');

	return (
		<header>
			<div>{date}</div>
			<div>{time.format('h:mm:ss a')}</div>
			<div>Choose which stops you would like to see</div>
			{/* For each stop that is available, render a button which can toggel
			viewing that stops info */}
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
		</header>
	);
};

export default Header;
