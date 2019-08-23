import React, {useContext} from 'react';
import {BusWhenContext} from '../State/BusWhenContext';

// Components
import Stop from './Stop';
import LateBusModal from './LateBusModal';

// Styles
import styled from 'styled-components';

const StyledAltText = styled.div`
	margin-top: 80px;
`;

const StopSwitcher = () => {
	const [{active, lateBus}] = useContext(BusWhenContext);
	return lateBus ? (
		<LateBusModal />
	) : active ? (
		<Stop />
	) : (
		<StyledAltText>Arrival times will show here!</StyledAltText>
	);
};

export default StopSwitcher;
