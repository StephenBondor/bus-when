import React, {createContext, useState} from 'react';
import moment from 'moment';

const BusWhenContext = createContext([{}, () => {}]);

const BusWhenProvider = ({children}) => {
	const [state, setState] = useState({
		active: false, // Stop Name: This is the currently selected 'Stop'
		busInfoID: false, // Event ID: This keeps track of which 'Stop/Route/Expand Next Arrival' to show
		time: moment(),
		offScheduleBusEvent: false, // Event ID: When not false, a modal shows
		offScheduleBusID: 'banana', // Bus ID: ID of the bus that is late
		eventAdditions: {}
	});
	const {Provider} = BusWhenContext;
	return <Provider value={[state, setState]}>{children}</Provider>;
};

export {BusWhenContext, BusWhenProvider};
