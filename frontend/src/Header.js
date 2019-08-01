import React from 'react';

// Components
import Button from './Button';

// Styles
import styled from 'styled-components';
import {colors} from './styles/Colors';

// GLOBALS
const STOPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

const Header = props => {
	let {time, active, setActive} = props;
	return (
		<HeaderContainer>
			<StyledH1> Bus When!?</StyledH1>
			<StyledDate>
				{time.format('MMMM D, YYYY')}&nbsp;&nbsp;&nbsp;
				{time.format('h:mm:ss a')}
			</StyledDate>
			<div>Choose which stops you would like to see:</div>
			{/* For each stop that is available, render a button which can toggle
			viewing that stops info */}
			{STOPS.map((stop, i) => (
				<Button
					key={i}
					stop={stop}
					active={active}
					setActive={setActive}
				/>
			))}
		</HeaderContainer>
	);
};

export default Header;
