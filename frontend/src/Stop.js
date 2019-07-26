import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import Route from './Route';

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

const Stop = props => {
	let {time, stop} = props;

	return (
		<>
			Stop {stop}:
			{/* // Each Stop has a period interval every 15 minutes
			// Where the schedule for the next bus repeats indefanately every 15 min.
			// Query the time in minutes % 15 =>
			// map over the 3 routes for that time =>
			// for each route, return their 2 most recent times */}
			<Query
				query={STOP_QUERY}
				variables={{
					time: Number(time.format('mm')) % 15,
					name: stop.toString()
				}}>
				{({loading, error, data}) => {
					if (loading) return <> laoding...</>;
					if (error) return <> Error at STOP_QUERY... </>;
					return (
						<>
							{data.time.stop.buses.map((bus, j) => (
								<Route key={j} bus={bus} />
							))}
						</>
					);
				}}
			</Query>
		</>
	);
};

export default Stop;
