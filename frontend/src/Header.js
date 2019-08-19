import React from 'react';
import gql from 'graphql-tag';

// Components
import {Query} from 'react-apollo';
import Button from './Button';
import GQLErrorHandler from './QueryErrorHandling';

// Styles
import styled from 'styled-components';
import {colors} from './styles/Colors';

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

const Header = ({time, active, setActive}) => (
	<HeaderContainer>
		<StyledH1> Bus When!?</StyledH1>
		<StyledDate>
			{time.format('MMMM D, YYYY')}&nbsp;&nbsp;&nbsp;
			{time.format('h:mm:ss a')}
		</StyledDate>
		<div>Choose which stops you would like to see:</div>
		{/* For each stop that is available, render a button which can toggle
			viewing that stops info */}
		<Query query={STOPS_QUERY}>
			{/*STOPS_QUERY_TEST when testing */}
			{({loading, error, data}) =>
				loading || error || !Object.keys(data).length ? (
					<GQLErrorHandler
						status={{name: 'STOPS_QUERY', loading, error, data}}
					/>
				) : (
					// "data.stopsTests.map..." when testing
					data.stops.map((stop, i) => (
						<Button
							key={i}
							stop={stop}
							active={active}
							setActive={setActive}
						/>
					))
				)
			}
		</Query>
	</HeaderContainer>
);

// GQL Queries
const STOPS_QUERY = gql`
	query {
		stops
	}
`;
// const STOPS_QUERY_TEST = gql`
// 	query {
// 		stopsTest
// 	}
// `;

export default Header;
