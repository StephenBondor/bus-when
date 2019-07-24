import React, {useState, useEffect} from 'react';
import * as moment from 'moment';

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
		</div>
	);
};

export default App;
