import React, {useState, useEffect} from 'react';
import * as moment from 'moment';

// Components
import Header from './Header';
import Stop from './Stop';

// Styles
import styled from 'styled-components';
import {GlobalStyle} from './styles/GlobalStyles';

const AppContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	min-height: 100%;
`;

const StyledAltText = styled.div`
	margin-top: 80px;
`;

const App = () => {
	// Local state management
	const [time, setTime] = useState(moment());
	const [active, setActive] = useState([1]);

	// Update the state every second to target "near" real-time information
	useEffect(() => {
		let id = setInterval(() => setTime(moment()), 1000);
		return () => clearInterval(id);
	}, []);

	return (
		<>
			<GlobalStyle />
			<AppContainer>
				<Header time={time} active={active} setActive={setActive} />
				{/* map over all of the actively viewed stops */}
				{active.length ? (
					active.map((stop, i) => (
						<Stop key={i} stop={stop} time={time} />
					))
				) : (
					<StyledAltText>Arrival times will show here!</StyledAltText>
				)}
			</AppContainer>
		</>
	);
};

export default App;
