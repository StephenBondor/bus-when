import React from 'react';

// Components
import BusInfoSwitcher from './BusInfoSwitcher';

// Styles
import styled from 'styled-components';
import {colors} from '../styles/Colors';

const StyledRoute = styled.div`
	margin-bottom: 20px;
`;

const BoldSpan = styled.span`
	font-weight: 900;
	font-size: 1.8rem;
`;

const HLSpan = styled.span`
	color: red;
	background: ${colors.lightGrey};
	border-radius: 5px;
	margin: 2px;
	padding: 2px;
`;

const Route = ({bus}) => {
	let arrivals = bus.arrivals.sort((a, b) => a.time > b.time);
	return (
		<StyledRoute>
			<BoldSpan>Route {bus.route}</BoldSpan> arriving&nbsp;
			{!arrivals[0].time ? (
				<>
					<HLSpan>&nbsp;NOW&nbsp;</HLSpan> and in
				</>
			) : (
				<>
					in: <HLSpan>&nbsp;{arrivals[0].time} mins&nbsp;</HLSpan> and
				</>
			)}
			&nbsp;<HLSpan>&nbsp;{arrivals[1].time}&nbsp;mins&nbsp;</HLSpan>
			<BusInfoSwitcher id={arrivals[0].id} />
		</StyledRoute>
	);
};

export default Route;
