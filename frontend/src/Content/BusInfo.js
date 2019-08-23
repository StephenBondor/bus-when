import React, {useContext} from 'react';
import {BusWhenContext} from '../State/BusWhenContext';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import moment from 'moment';

// Components
import GQLErrorHandler from '../QueryErrorHandling';

// Styles
import styled from 'styled-components';
import {colors} from '../styles/Colors';

const BusInfoContainer = styled.div`
	background: ${colors.foreground};
	color: ${colors.textOnFG};
	text-align: left;
	width: 100%;
`;

const FetchedBusContainer = styled.div`
	/* position: absolute; */
`;

const CloseButton = styled.div`
	background: ${colors.foreground};
	color: ${colors.textOnFG};
	text-align: center;
	width: 100%;
	text-decoration: none;
	transition: all 0.2s;

	&:hover {
		color: ${colors.hoverColor};
		cursor: pointer;
	}
	&:active {
		color: ${colors.active};
	}
`;

const VisualContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	height: 40px;
	margin-bottom: ${props => (props.reportLate ? '0' : '18px')};
`;

const StopCircle = styled.div`
	border-radius: 100%;
	width: 10px;
	height: 10px;
	background: ${props => (props.passed ? 'red' : 'green')};
	padding-top: 8px;
`;

const LateBus = styled.button`
	background: ${colors.textOnFG};
	color: ${colors.foreground};
	position: relative;
	top: -80px;
	left: 185px;
	width: 120px;
	padding-left: 10px;
	border-radius: 15px;
	text-decoration: none;
`;

const reportLateBus = (setState, id) =>
	setState(state => ({...state, lateBus: id}));

const onClickHandler = setState =>
	setState(state => ({...state, busInfoID: false}));

const BusInfo = () => {
	const [{busInfoID}, setState] = useContext(BusWhenContext);
	const variables = {id: busInfoID};
	const {data, error, loading} = useQuery(EVENT_QUERY, {variables});
	const status = {name: 'expected bus arrival', loading, error, data};
	const {event} = data;
	return (
		<BusInfoContainer>
			{loading || error || !Object.keys(data).length ? (
				<GQLErrorHandler status={status} />
			) : (
				<FetchedBusContainer>
					<div>Bus #: {event.bus.id.slice(10, 15).toUpperCase()}</div>
					<div>
						Stop {event.stop.name} ETA:{' '}
						{moment(event.time).format('h:mm:ss a')}
					</div>
					<VisualContainer
						reportLate={moment(event.time).diff(moment()) <= 0}>
						{event.bus.eventList.map((event, i) => (
							<StopCircle
								key={i}
								passed={moment(event.time).diff(moment()) < 0}>
								{event.stop.name}
							</StopCircle>
						))}
					</VisualContainer>
					{moment(event.time).diff(moment()) <= 0 && (
						<LateBus
							onClick={() => reportLateBus(setState, busInfoID)}>
							Late Bus?
						</LateBus>
					)}
				</FetchedBusContainer>
			)}
			<CloseButton onClick={() => onClickHandler(setState)}>
				▲ Collaps Next Arrival ▲
			</CloseButton>
		</BusInfoContainer>
	);
};

// Query shape for the returned data...
const EVENT_QUERY = gql`
	query EventQuery($id: String!) {
		event(id: $id) {
			id
			time
			stop {
				id
				name
			}
			bus {
				id
				eventList {
					id
					time
					stop {
						id
						name
					}
				}
			}
		}
	}
`;

export default BusInfo;
