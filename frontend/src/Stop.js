import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

// Components
import Route from './Route';
import GQLErrorHandler from './QueryErrorHandling';
// import StopQueryTest from './test/StopQueryTest';

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

const Stop = ({time, stop}) => {
	const {data, error, loading} = useQuery(STOP_QUERY, {
		variables: {
			time: `${time.format().slice(0, 16)}:00.000-07:00`,
			stop: stop.toString()
		}
	});
	return (
		<StopsContainer>
			<StyledH2>Stop {stop}:</StyledH2>
			{loading || error || !Object.keys(data).length ? (
				<GQLErrorHandler
					status={{name: 'STOP_QUERY', loading, error, data}}
				/>
			) : (
				data.times
					.sort((a, b) => a.route > b.route)
					.map((bus, j) => <Route key={j} bus={bus} />)
			)}
			{/* <StopQueryTest time={time} stop={stop} /> */}
		</StopsContainer>
	);
};

// Query shape for the returned data...
const STOP_QUERY = gql`
	query StopQuery($time: String!, $stop: String!) {
		times(time: $time, stop: $stop) {
			route
			arrivals
		}
	}
`;

export default Stop;
