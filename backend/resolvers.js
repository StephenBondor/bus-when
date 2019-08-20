const Query = require('./Query');
const TestQuery = require('./tests/TestQuery');
const TestResolver = require('./tests/TestResolver');

const resolvers = {
	// Top level Standard GQL Resolvers
	Query: {...Query, ...TestQuery},

	// Additional Resolvers
	...TestResolver
};

module.exports = {resolvers};
