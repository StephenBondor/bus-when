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
	background: ${({off, locked}) =>
		off ? (locked ? colors.textOnFG : colors.inactive) : colors.foreground};
	border: 2px solid ${({off}) => (off ? colors.foreground : colors.activeBG)};
	color: ${({off}) => (off ? colors.foreground : colors.textOnFG)};
	border-radius: 20%;
	font-size: 2rem;
	min-width: 50px;
`;

const Button = ({stop}) => {
	const [state, setState] = useContext(BusWhenContext);
	return (
		<StyledButton
			off={state.active !== stop}
			locked={state.lateBus === false}
			onClick={() =>
				!state.lateBus && setState(state => ({...state, active: stop}))
			}>
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
