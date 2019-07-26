import React, {useState, useEffect} from 'react';
import * as moment from 'moment';

import Header from './Header';
import Stop from './Stop';

const App = () => {
	const [time, setTime] = useState(moment());
	const [active, setActive] = useState([]);

	useEffect(() => {
		let id = setInterval(() => setTime(moment()), 1000);
		return () => clearInterval(id);
	}, []);

	return (
		<div>
			<Header time={time} active={active} setActive={setActive} />
			{active.map((stop, i) => (
				<Stop key={i} stop={stop} time={time} />
			))}
		</div>
	);
};

export default App;
