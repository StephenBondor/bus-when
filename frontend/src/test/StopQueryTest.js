import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

// Components
import Route from '../Route';
import GQLErrorHandler from '../QueryErrorHandling';

const StopQueryTest = ({time, stop}) => {
	const {data, error, loading} = useQuery(STOP_QUERY_TEST, {
		variables: {
			time: Number(time.format('mm')) % 15,
			name: stop.toString()
		}
	});
	return (
		<>
			Test data:
			{loading || error || !Object.keys(data).length ? (
				<GQLErrorHandler
					status={{
						name: 'STOP_QUERY_TEST',
						loading,
						error,
						data
					}}
				/>
			) : (
				data.timeTest.stop.buses.map((bus, j) => (
					<Route key={j} bus={bus} />
				))
			)}
		</>
	);
};

// A note on this GQL Query:
// Each Stop has a period interval every 15 minutes
// Where the schedule for the next bus repeats indefanately every 15 min.
// Query the time in minutes % 15 =>
// map over the 3 routes for that time =>
// for each route, return their 2 most recent times

// Query Share for test data
const STOP_QUERY_TEST = gql`
	query StopTestQuery($time: Int!, $name: String!) {
		timeTest(time: $time) {
			stop(name: $name) {
				buses {
					route
					arrivals
				}
			}
		}
	}
`;

export default StopQueryTest;
