const {nextArrival} = require('./ArrivalTimes');
const STOPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const resolvers = {
	// Top level Resolver Directory
	Query: {
		sanityCheck: () => 'You are not insane',
		timeTest: (parent, args) => ({
			value: args.time,
			stops: nextArrival[args.time]
		}),
		stopsTest: () => STOPS,
		stops: async (parent, args, context, info) => {
			let stops = await context.prisma.stops();
			return stops.map(stop => stop.name);
		}
	},
	// Integration Testing Resolvers
	TimeTypeTest: {
		value: parent => parent.value,
		stop: (parent, args) => ({
			name: args.name,
			buses: parent.stops[args.name]
		})
	},
	StopTypeTest: {
		name: parent => parent.name,
		buses: parent =>
			Object.keys(parent.buses).map(i => ({
				route: i,
				arrivals: parent.buses[i]
			}))
	},
	BusTypeTest: {
		route: ({route}) => route,
		arrivals: parent => parent.arrivals
	}
	// Actual Resolvers
};

module.exports = {resolvers};
