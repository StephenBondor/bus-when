import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

const URI =
	process.env.NODE_ENV === 'production'
		? 'https://frozen-crag-20790.herokuapp.com'
		: 'http://localhost:4000/';

const httpLink = createHttpLink({
	uri: URI
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
