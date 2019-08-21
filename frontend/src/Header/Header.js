import React, {useContext, useEffect} from 'react';
import {BusWhenContext} from '../State/BusWhenContext';
import * as moment from 'moment';

// Components
import StopList from './StopList';

// Styles
import styled from 'styled-components';
import {colors} from '../styles/Colors';

const HeaderContainer = styled.header`
	padding: 30px;
	width: 100%;
	text-align: center;
	/* Holy crap this website is awesome for gradients: https://cssgradient.io */
	background: linear-gradient(
		6deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(9, 9, 121, 1) 42%,
		rgba(0, 151, 255, 1) 100%
	);
	color: ${colors.textOnFG};
`;

const StyledH1 = styled.h1`
	font-size: 4rem;
	margin-bottom: 20px;
`;

const StyledDate = styled.div`
	margin: 10px;
`;

const Header = () => {
	const [state, setState] = useContext(BusWhenContext);
	const {time} = state;

	useEffect(() => {
		let id = setInterval(() => {
			setState(state => ({...state, time: moment()}));
		}, 1000);
		return () => clearInterval(id);
	});

	return (
		<HeaderContainer>
			<StyledH1> Bus When!?</StyledH1>
			<StyledDate>
				{time.format('MMMM D, YYYY')}&nbsp;&nbsp;&nbsp;
				{time.format('h:mm:ss a')}
			</StyledDate>
			<div>Choose which stop you would like to see:</div>
			<StopList />
		</HeaderContainer>
	);
};
export default Header;
