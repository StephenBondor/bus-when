import React from 'react';
import {BusWhenProvider} from './State/BusWhenContext';

// Components
import Header from './Header/Header';
import StopLogic from './Content/StopLogic';

// Styles
import styled from 'styled-components';
import {GlobalStyle} from './styles/GlobalStyles';

const AppContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	min-height: 100%;
`;

const App = () => (
	<>
		<GlobalStyle />
		<BusWhenProvider>
			<AppContainer>
				<Header />
				<StopLogic />
			</AppContainer>
		</BusWhenProvider>
	</>
);
export default App;
