const {prisma} = require('./src/generated/prisma-client');
const {GraphQLServer} = require('graphql-yoga');
const {resolvers} = require('./resolvers');
var port = process.env.PORT || 4000;

const options = {
	port: port
};

const server = new GraphQLServer({
	typeDefs: './backend/schema.graphql',
	resolvers,
	context: {prisma},
	options
});

module.exports = {server, options};
