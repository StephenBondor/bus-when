import React from 'react';

// Styles
import styled from 'styled-components';
import {colors} from '../styles/Colors';

const HLSpan = styled.span`
	color: red;
	background: ${colors.lightGrey};
	border-radius: 5px;
	margin: 2px;
`;

const Route = ({bus}) => (
	<div>
		Route {bus.route} arriving&nbsp;
		{!bus.arrivals[0] ? (
			<>
				<HLSpan>&nbsp;NOW&nbsp;</HLSpan> and in
			</>
		) : (
			<>
				in: <HLSpan>&nbsp;{bus.arrivals[0]} mins&nbsp;</HLSpan> and
			</>
		)}
		&nbsp;<HLSpan>&nbsp;{bus.arrivals[1]}&nbsp;mins&nbsp;</HLSpan>
	</div>
);

export default Route;
