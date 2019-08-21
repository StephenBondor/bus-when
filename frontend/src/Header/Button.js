import React, {useContext} from 'react';
import {BusWhenContext} from '../State/BusWhenContext';

// Styles
import styled from 'styled-components';
import {colors} from '../styles/Colors';

const StyledButton = styled.button`
	margin: 5px;
	padding: 10px;
	text-decoration: none;
	/* if the button is active change its color */
	background: ${({off}) => (off ? colors.textOnFG : colors.activeBG)};
	min-width: 50px;
	border-radius: 20%;
`;

const Button = ({stop}) => {
	const [state, setState] = useContext(BusWhenContext);
	return (
		<StyledButton
			off={state.active !== stop}
			onClick={() => setState(state => ({...state, active: stop}))}>
			{stop}
		</StyledButton>
	);
};
export default Button;

// Buttons have been refactored to only allow one button to be pressable at a time.
// This may mean it would be good to refactor other code to stop mapping over a list of one
// Additionally, it may mean it would be good to refactor this setup to use React Router
//
// let isNotActive = !active.find(i => i === stop);
// const clickHandler = () =>
// 	isNotActive
// 		? setActive([[...new Set([...active, stop])].sort((a, b) => a - b)])
// 		: setActive(active.filter(i => i !== stop));
