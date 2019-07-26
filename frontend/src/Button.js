import React from 'react';

// Styles
import styled from 'styled-components';
import {colors} from './styles/Colors';

const StyledButton = styled.button`
	margin: 5px;
	padding: 10px;
	text-decoration: none;
	/* if the button is active change its color */
	background: ${props => (props.off ? colors.textOnFG : colors.activeBG)};
	min-width: 50px;
	border-radius: 20%;
`;

const Button = props => {
	let {stop, active, setActive} = props;
	let isActive = !active.find(i => i === stop);

	const clickHandler = () =>
		isActive
			? setActive([...new Set([...active, stop])].sort((a, b) => a - b))
			: setActive([...active.filter(i => i !== stop)]);

	return (
		<StyledButton off={isActive} onClick={() => clickHandler()}>
			{stop}
		</StyledButton>
	);
};

export default Button;
