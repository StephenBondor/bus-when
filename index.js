const {GraphQLServer} = require('graphql-yoga');
const {resolvers} = require('./backend/resolvers');
var port = process.env.PORT || 4000;

const options = {
	port: port
};

const server = new GraphQLServer({
	typeDefs: 'backend/schema.graphql',
	resolvers,
	options
});
server.start(options, ({port}) => {
	console.log(`\nServer is running on port ${port}\n`);
});
