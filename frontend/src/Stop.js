import React from 'react';
import gql from 'graphql-tag';

// Components
import {Query} from 'react-apollo';
import Route from './Route';
import GQLErrorHandler from './QueryErrorHandling';

// Styles
import styled from 'styled-components';

const StopsContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: bottom;
	padding: 20px;
	width: 100%;
	max-width: 375px;
`;

const StyledH2 = styled.h2`
	margin-bottom: 10px;
`;

// A note on this GQL Query:
// Each Stop has a period interval every 15 minutes
// Where the schedule for the next bus repeats indefanately every 15 min.
// Query the time in minutes % 15 =>
// map over the 3 routes for that time =>
// for each route, return their 2 most recent times

const Stop = ({time, stop}) => (
	<StopsContainer>
		<StyledH2>Stop {stop}:</StyledH2>
		<Query
			query={STOP_QUERY}
			variables={{
				time: Number(time.format('mm')) % 15,
				name: stop.toString()
			}}>
			{({loading, error, data}) =>
				loading || error || !Object.keys(data).length ? (
					<GQLErrorHandler
						status={{name: 'STOP_QUERY', loading, error, data}}
					/>
				) : (
					data.time.stop.buses.map((bus, j) => (
						<Route key={j} bus={bus} />
					))
				)
			}
		</Query>
	</StopsContainer>
);

// the query shape for the returned data... it could def be improved/simplified
const STOP_QUERY = gql`
	query StopQuery($time: Int!, $name: String!) {
		time(time: $time) {
			stop(name: $name) {
				buses {
					route
					arrivals
				}
			}
		}
	}
`;

export default Stop;
