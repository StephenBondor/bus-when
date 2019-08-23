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
	padding-bottom: 10px;
	width: 100%;
	text-align: center;
	background: ${colors.foreground};
	color: ${colors.textOnFG};
`;

const StyledH1 = styled.h1`
	font-size: 4rem;
	margin-bottom: 20px;
`;

const StyledDate = styled.div`
	margin: 10px;
	font-size: 2rem;
	background: ${colors.textOnFG};
	color: ${colors.foreground};
`;

const Header = () => {
	const [{time}, setState] = useContext(BusWhenContext);

	useEffect(() => {
		let id = setInterval(() => {
			setState(state => ({...state, time: moment()}));
		}, 1000);
		return () => clearInterval(id);
	});

	return (
		<HeaderContainer>
			<StyledH1> Bus When</StyledH1>
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
