import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';

// Http address
const URIhttp =
	process.env.NODE_ENV === 'production'
		? 'https://frozen-crag-20790.herokuapp.com'
		: 'http://localhost:4000/';

// websocket address
const URIws =
	process.env.NODE_ENV === 'production'
		? 'ws://frozen-crag-20790.herokuapp.com'
		: 'ws://localhost:4000/';

// Create an http link:
const httpLink = new HttpLink({
	uri: URIhttp
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
	uri: URIws,
	options: {
		reconnect: true
	}
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
	// split based on operation type
	({query}) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	link: link,
	cache: new InMemoryCache()
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
