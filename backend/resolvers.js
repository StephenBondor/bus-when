const Query = require('./Query');
const Mutation = require('./Mutation');
const Subscription = require('./Subscription');
const TestQuery = require('./tests/TestQuery');
const TestResolver = require('./tests/TestResolver');
const Event = require('./Event');
const Stop = require('./Stop');
const Bus = require('./Bus');
const Route = require('./Route');

const resolvers = {
	// Top level Standard GQL Resolvers
	Query: {...Query, ...TestQuery},
	Mutation,
	Subscription,

	// Graph connection resolvers
	Event,
	Stop,
	Bus,
	Route,

	// Additional Resolvers
	...TestResolver
};

module.exports = {resolvers};
