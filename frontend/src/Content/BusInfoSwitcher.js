import React, {useContext} from 'react';
import {BusWhenContext} from '../State/BusWhenContext';

// Components
import BusInfo from './BusInfo';

// Styles
import styled from 'styled-components';
import {colors} from '../styles/Colors';

const BusInfoSwitcherContainer = styled.div`
	background: ${colors.foreground};
	color: ${colors.textOnFG};
	text-align: center;
	padding-left: 15px;
	padding-right: 15px;
	text-decoration: none;
	width: 100%;
	border-radius: 15px 0 0 0;
	transition: all 0.2s;
	&:hover {
		color: ${colors.hoverColor};
		cursor: ${({pointer}) => (pointer ? 'pointer' : 'arrow')};
	}
	&:active {
		color: ${colors.active};
	}
`;

const onClickHandler = (setState, id) =>
	setState(state => ({...state, busInfoID: id}));

const BusInfoSwitcher = ({id}) => {
	const [{busInfoID}, setState] = useContext(BusWhenContext);
	return (
		<BusInfoSwitcherContainer pointer={busInfoID !== id}>
			{busInfoID !== id ? (
				<div onClick={() => onClickHandler(setState, id)}>
					▼ Expand Next Arrival ▼
				</div>
			) : (
				<BusInfo />
			)}
		</BusInfoSwitcherContainer>
	);
};

export default BusInfoSwitcher;
