import React, {useContext, useEffect} from 'react';
import gql from 'graphql-tag';
import {useQuery, useSubscription} from '@apollo/react-hooks';
import {BusWhenContext} from '../State/BusWhenContext';
import moment from 'moment';

// Components
import Route from './Route';
import GQLErrorHandler from '../QueryErrorHandling';

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

const updateTimes = (times, stop, eAdds) => {
	let timesObj;
	times.forEach(time => {
		timesObj = {...timesObj, [time.id]: time};
	});
	for (let key of Object.keys(eAdds)) {
		if (eAdds[key].stop.name === stop && !timesObj.hasOwnProperty(key))
			times.push(eAdds[key]);
	}
	return times;
};

const Stop = () => {
	const [{active: stop, eventAdditions}, setState] = useContext(
		BusWhenContext
	);
	const variables = {stop: stop.toString()};
	let {data, error, loading} = useQuery(STOP_QUERY, {variables});
	const status = {name: 'stop', loading, error, data};
	const {data: newData, loading: newLoading} = useSubscription(
		NEW_EVENT_SUBSCRIPTION
	);

	useEffect(() => {
		if (
			!newLoading &&
			(eventAdditions.length === 0 ||
				!eventAdditions.hasOwnProperty(newData.newEvent.id))
		)
			setState(state => ({
				...state,
				eventAdditions: {
					...state.eventAdditions,
					[newData.newEvent.id]: newData.newEvent
				}
			}));
	}, [newData, newLoading, setState, eventAdditions]);

	return loading || error || !Object.keys(data).length ? (
		<GQLErrorHandler status={status} />
	) : (
		<StopContainer>
			{updateTimes(data.times, stop.toString(), eventAdditions)
				.reduce((r, {id, time, bus: {route: {name}}}) => {
					let dur = moment(time)
						.add(1, 'minute')
						.diff(moment(), 'minutes');
					let index = r.findIndex(({route}) => route === name);
					let entry = {time: dur, id: id};
					if (index !== -1) r[index].arrivals.push(entry);
					else r.push({route: name, arrivals: [entry]});
					return r;
				}, [])
				.sort((a, b) => a.route > b.route)
				.map(bus => ({
					...bus,
					arrivals: bus.arrivals.filter(({time}) => time >= 0)
				}))
				.map((bus, j) => (
					<Route key={j} bus={bus} />
				))}
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
