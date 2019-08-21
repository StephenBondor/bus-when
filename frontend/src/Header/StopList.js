import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

// Components
import Button from './Button';
import GQLErrorHandler from '../QueryErrorHandling';

const StopList = ({active, setActive}) => {
	const {data, error, loading} = useQuery(STOPS_QUERY);

	return loading || error || !Object.keys(data).length ? (
		<GQLErrorHandler status={{name: 'STOPS_QUERY', loading, error, data}} />
	) : (
		data.stops.map((stop, i) => (
			<Button key={i} stop={stop} active={active} setActive={setActive} />
		))
	);
};

// GQL Queries
const STOPS_QUERY = gql`
	query {
		stops
	}
`;

export default StopList;
