import React, {useContext} from 'react';
import {BusWhenContext} from '../State/BusWhenContext';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import moment from 'moment';
// import STOP_QUERY from './Stop';

// Styles
import styled from 'styled-components';
import {colors} from '../styles/Colors';

const StyledLateBusModal = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	min-height: 50vh;
	margin: 20px;
	background: ${colors.foreground};
`;

const InnerModal = styled.div`
	color: ${colors.textOnFG};
	width: 90%;
	height: 90%;
	padding: 20px;
`;

const ModalButton = styled.button`
	border-radius: 15px;
	text-decoration: none;
	font-size: 2rem;
	margin: 20px;
	width: 120px;
	border: ${props => (props.happy ? `3px solid ${colors.activeBG}` : 'none')};
	background: ${props => (props.happy ? colors.foreground : colors.textOnFG)};
	color: ${props => (props.happy ? colors.textOnFG : colors.foreground)};
`;

const BoldSpan = styled.span`
	font-weight: 900;
	font-size: 1.8rem;
`;

const onClickHandler = setState =>
	setState(state => ({...state, lateBus: false}));

const updateHandler = (setState, updateEvent, id, active) => {
	const variables = {
		id,
		time: moment().format()
	};
	updateEvent({variables});
	setState(state => ({...state, lateBus: false}));
};

const LateBusModal = () => {
	const [{active, lateBus}, setState] = useContext(BusWhenContext);
	const [updateEvent] = useMutation(UPDATE_EVENT);

	return (
		<StyledLateBusModal>
			<InnerModal>
				<BoldSpan>Report a late bus at Stop {active} </BoldSpan>
				<br /> <br />
				Only tap "It's here!" once the bus has arrived.
				<br />
				<br />
				Thank you for keeping the bus arrival times accurate!
			</InnerModal>
			<div>
				<ModalButton
					happy={true}
					onClick={() =>
						updateHandler(setState, updateEvent, lateBus, active)
					}>
					It's here!
				</ModalButton>
				<ModalButton onClick={() => onClickHandler(setState)}>
					Cancel
				</ModalButton>
			</div>
		</StyledLateBusModal>
	);
};

const UPDATE_EVENT = gql`
	mutation UpdateEvent($id: String!, $time: String!) {
		updateEvent(id: $id, time: $time) {
			id
			time
		}
	}
`;

export default LateBusModal;
