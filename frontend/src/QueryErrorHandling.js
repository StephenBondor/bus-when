import React from 'react';

const GQLErrorHandler = ({status: {loading, error, data, name}}) => {
	if (loading) return <> Loading {name}... </>;
	if (error) {
		console.log(error);
		return <>Error: {name} malfunction (See Console Log)</>;
	}
	if (!Object.keys(data).length) {
		return (
			<>
				Error: Data from {name} is unpopulated, check if server is
				running
			</>
		);
	}
	return <></>;
};

export default GQLErrorHandler;
