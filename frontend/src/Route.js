import React from 'react';

// Styles
import styled from 'styled-components';
import {colors} from './styles/Colors';

const HLSpan = styled.span`
	color: red;
	background: ${colors.lightGrey};
	border-radius: 5px;
	margin: 2px;
`;

const Route = props => {
	let {bus} = props;

	return (
		<div>
			Route {bus.route} arriving{' '}
			{!bus.arrivals[0] ? (
				<>
					<HLSpan>&nbsp;NOW&nbsp;</HLSpan> and in
					<HLSpan>&nbsp;{bus.arrivals[1]}&nbsp;mins&nbsp;</HLSpan>
				</>
			) : (
				<>
					in: <HLSpan>&nbsp;{bus.arrivals[0]} mins&nbsp;</HLSpan> and{' '}
					<HLSpan>&nbsp;{bus.arrivals[1]} mins&nbsp;</HLSpan>
				</>
			)}
		</div>
	);
};

export default Route;
