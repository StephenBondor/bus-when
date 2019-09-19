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

// Helper functions
const updateTimes = (times, stop, eAdds) => {
	let timesObj;
	// convert times to an object
	for (let i = 0; i < times.length; i++)
		timesObj = {...timesObj, [times[i].id]: times[i]};
	// if the new event additions applies, add it to times
	for (let key of Object.keys(eAdds))
		if (eAdds[key].stop.name === stop && !timesObj.hasOwnProperty(key))
			times.push(eAdds[key]);
	return times;
};
const getDurration = (time, buffer) =>
	moment(time)
		.add(buffer, 'minute')
		.diff(moment(), 'minutes');

const Stop = () => {
	const [{active, eventAdditions}, setState] = useContext(BusWhenContext);
	const variables = {stop: active.toString()};
	let {data, error, loading} = useQuery(STOP_QUERY, {variables});
	const status = {name: 'stop', loading, error, data};
	const {data: newData, loading: newLoading} = useSubscription(
		NEW_EVENT_SUBSCRIPTION
	);
	const {data: updateData, loading: updateLoading} = useSubscription(
		UPDATED_EVENT_SUBSCRIPTION
	);

	useEffect(() => {
		// If new data has arrived from the socket
		if (!newLoading && !eventAdditions.hasOwnProperty(newData.newEvent.id))
			setState(state => {
				// check that the old data on state is still valid
				let [newEObj, {eventAdditions: eAdds}] = [{}, state];
				for (let key of Object.keys(eAdds))
					if (getDurration(eAdds[key].time, 2) > 0)
						newEObj = {...newEObj, [key]: eAdds[key]};
				// use that valid data and the new data, and add it to state
				return {
					...state,
					eventAdditions: {
						...newEObj,
						[newData.newEvent.id]: newData.newEvent
					}
				};
			});
		// If updated data has arrived form the socket
		if (
			!updateLoading &&
			eventAdditions.hasOwnProperty(updateData.updateEvent.id)
		)
			setState(state => ({
				...state,
				eventAdditions: {
					...state.eventAdditions,
					[updateData.updateEvent.id]: updateData.updateEvent
				}
			}));
	}, [
		newData,
		newLoading,
		setState,
		eventAdditions,
		updateLoading,
		updateData
	]);

	return loading || error || !Object.keys(data).length ? (
		<GQLErrorHandler status={status} />
	) : (
		<StopContainer>
			{/* This cleans and formats the returned data before sending to Route*/}
			{updateTimes(data.times, active.toString(), eventAdditions)
				.reduce((r, {id, time, bus: {route: {name}}}) => {
					let dur = getDurration(time, 1);
					if (dur >= 0) {
						let index = r.findIndex(({route}) => route === name);
						let entry = {time: dur, id: id};
						if (index !== -1) r[index].arrivals.push(entry);
						else r.push({route: name, arrivals: [entry]});
					}
					return r;
				}, [])
				.sort((a, b) => a.route > b.route)
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

const UPDATED_EVENT_SUBSCRIPTION = gql`
	subscription onNewEvent {
		updateEvent {
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
