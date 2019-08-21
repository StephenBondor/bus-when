import React, {useContext} from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {BusWhenContext} from '../State/BusWhenContext';

// Components
import Route from './Route';
import GQLErrorHandler from '../QueryErrorHandling';

// Testing
// import StopQueryTest from '../test/StopQueryTest';

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

const Stop = () => {
	const [{active: stop, time}] = useContext(BusWhenContext);
	const variables = {
		time: `${time.format().slice(0, 16)}:00.000-07:00`,
		stop: stop.toString()
	};
	const {data, error, loading} = useQuery(STOP_QUERY, {variables});
	const status = {name: 'STOP_QUERY', loading, error, data};
	return (
		<StopsContainer>
			<StyledH2>Stop {stop}:</StyledH2>
			{loading || error || !Object.keys(data).length ? (
				<GQLErrorHandler status={status} />
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
