import React, {useState, useEffect} from 'react';
import * as moment from 'moment';

import Header from './Header';
import Stop from './Stop';

const App = () => {
	// Local state management
	const [time, setTime] = useState(moment());
	const [active, setActive] = useState([]);

	// Update the state every second to target "near" real-time information
	useEffect(() => {
		let id = setInterval(() => setTime(moment()), 1000);
		return () => clearInterval(id);
	}, []);

	return (
		<>
			<Header time={time} active={active} setActive={setActive} />
			{/* map over all of the actively viewed stops */}
			{active.map((stop, i) => (
				<Stop key={i} stop={stop} time={time} />
			))}
		</>
	);
};

export default App;
