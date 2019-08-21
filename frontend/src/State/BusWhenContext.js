import React, {createContext, useState} from 'react';
import moment from 'moment';

const BusWhenContext = createContext([{}, () => {}]);

const BusWhenProvider = ({children}) => {
	const [state, setState] = useState({active: false, time: moment()});
	const {Provider} = BusWhenContext;
	return <Provider value={[state, setState]}>{children}</Provider>;
};

export {BusWhenContext, BusWhenProvider};
