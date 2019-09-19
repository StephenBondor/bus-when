import React, {useContext} from 'react';
import {BusWhenContext} from '../State/BusWhenContext';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

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
	border: ${({happy}) => (happy ? `3px solid ${colors.activeBG}` : 'none')};
	background: ${({happy}) => (happy ? colors.foreground : colors.textOnFG)};
	color: ${({happy}) => (happy ? colors.textOnFG : colors.foreground)};
`;

const BoldSpan = styled.span`
	font-weight: 900;
	font-size: 1.8rem;
`;

const resetState = setState =>
	setState(state => ({
		...state,
		offScheduleBusID: false,
		offScheduleBusEvent: false
	}));

const LateBusModal = () => {
	const [state, setState] = useContext(BusWhenContext);
	const {active, offScheduleBusEvent, offScheduleBusID} = state;
	const [updateEvent] = useMutation(UPDATE_EVENT);

	return (
		<StyledLateBusModal>
			<InnerModal>
				<BoldSpan>
					Report an off-schedule bus at Stop {active}{' '}
				</BoldSpan>
				<br /> <br />
				It seems bus {offScheduleBusID.slice(10, 15).toUpperCase()} is
				not running on time
				<br /> <br />
				Tap "It's here!" as the bus arrives.
				<br /> <br />
				Thank you for keeping the bus arrival times accurate!
			</InnerModal>
			<div>
				<ModalButton
					happy={true}
					onClick={() => {
						updateEvent({variables: {id: offScheduleBusEvent}});
						resetState(setState);
					}}>
					It's here!
				</ModalButton>
				<ModalButton onClick={() => resetState(setState)}>
					Cancel
				</ModalButton>
			</div>
		</StyledLateBusModal>
	);
};

const UPDATE_EVENT = gql`
	mutation UpdateEvent($id: String!) {
		updateEvent(id: $id) {
			id
			time
		}
	}
`;

export default LateBusModal;
