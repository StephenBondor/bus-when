const {GraphQLServer} = require('graphql-yoga');
const {gqlArrivals} = require('./ArrivalTimes');

// 2
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

// 3
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers
});
server.start(() =>
	console.log(`\nServer is running on http://localhost:4000\n`)
);
