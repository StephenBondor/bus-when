import React, {useContext} from 'react';
import {BusWhenContext} from '../State/BusWhenContext';

// Components
import Stop from './Stop';

// Styles
import styled from 'styled-components';

const StyledAltText = styled.div`
	margin-top: 80px;
`;

const StopLogic = () => {
	const [{active}] = useContext(BusWhenContext);
	return active ? (
		<Stop />
	) : (
		<StyledAltText>Arrival times will show here!</StyledAltText>
	);
};

export default StopLogic;
