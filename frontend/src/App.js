import React from 'react';
import {BusWhenProvider} from './State/BusWhenContext';

// Components
import Header from './Header/Header';
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

const App = () => (
	<>
		<GlobalStyle />
		<BusWhenProvider>
			<AppContainer>
				<Header />
				<Stop />
			</AppContainer>
		</BusWhenProvider>
	</>
);
export default App;
