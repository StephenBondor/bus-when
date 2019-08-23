import React, {useContext} from 'react';
import gql from 'graphql-tag';
import {useQuery, useSubscription} from '@apollo/react-hooks';
import {BusWhenContext} from '../State/BusWhenContext';
import moment from 'moment';

// Components
import Route from './Route';
import GQLErrorHandler from '../QueryErrorHandling';

// Testing
// import StopQueryTest from '../test/StopQueryTest';

// Styles
import styled from 'styled-components';

const StopContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: bottom;
	padding: 20px;
	width: 100%;
	max-width: 375px;
`;

const Stop = () => {
	const [{active: stop}] = useContext(BusWhenContext);
	const variables = {stop: stop.toString()};
	const {data, error, loading} = useQuery(STOP_QUERY, {variables});
	const status = {name: 'stop', loading, error, data};
	const {data: newData, loading: newLoading} = useSubscription(
		NEW_EVENT_SUBSCRIPTION
	);

	console.log('subscription data: ', !newLoading && newData);

	return (
		<StopContainer>
			{loading || error || !Object.keys(data).length ? (
				<GQLErrorHandler status={status} />
			) : (
				data.times
					.reduce((r, {id, time, bus}) => {
						let dur = moment(time)
							.add(1, 'minute')
							.diff(moment(), 'minutes');
						let name = bus.route.name;
						let index = r.findIndex(({route}) => route === name);
						if (index !== -1)
							r[index].arrivals.push({time: dur, id: id});
						else
							r.push({
								route: name,
								arrivals: [{time: dur, id: id}]
							});
						return r;
					}, [])
					.sort((a, b) => a.route > b.route)
					.map(bus => {
						bus.arrivals = bus.arrivals.filter(
							time => time.time >= 0
						);
						return bus;
					})
					.map((bus, j) => <Route key={j} bus={bus} />)
			)}
			{/* <StopQueryTest time={time} stop={stop} /> */}
		</StopContainer>
	);
};

// Query shape for the returned data...
const STOP_QUERY = gql`
	query StopQuery($stop: String!) {
		times(stop: $stop) {
			id
			time
			bus {
				id
				route {
					id
					name
				}
			}
		}
	}
`;

const NEW_EVENT_SUBSCRIPTION = gql`
	subscription onNewEvent {
		newEvent {
			id
			time
			stop {
				id
				name
			}
			bus {
				id
				route {
					id
					name
				}
			}
		}
	}
`;

export default Stop;
