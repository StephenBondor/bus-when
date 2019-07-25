const {GraphQLServer} = require('graphql-yoga');
const {gqlArrivals} = require('./ArrivalTimes');
var port = process.env.PORT || 4000;

const resolvers = {
	Query: {
		sanityCheck: () => 'You are not insane',
		time: () => gqlArrivals
	},
	Time: {
		value: parent => parent.value,
		stops: parent => parent.stops,
		stop: (parent, args) => parent.stops.filter(i => i.name === args.name)
	},
	Stop: {
		name: parent => parent.name,
		buses: parent => JSON.stringify(parent.buses)
	}
};

const options = {
	port: port
};

const server = new GraphQLServer({
	typeDefs: './schema.graphql',
	resolvers,
	options
});
server.start(options, ({port}) => {
	console.log(`\nServer is running on port ${port}\n`);
});
// server.listen({port: process.env.PORT || 4000}).then(({url}) => {
// 	console.log(`🚀 Server ready at ${url}`);
// });
