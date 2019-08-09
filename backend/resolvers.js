const {nextArrival} = require('./ArrivalTimes');
const STOPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const resolvers = {
	Query: {
		sanityCheck: () => 'You are not insane',
		time: (parent, args) => ({
			value: args.time,
			stops: nextArrival[args.time]
		}),
		stops: () => STOPS
	},
	Time: {
		value: parent => parent.value,
		stop: (parent, args) => ({
			name: args.name,
			buses: parent.stops[args.name]
		})
	},
	Stop: {
		name: parent => parent.name,
		buses: parent =>
			Object.keys(parent.buses).map(i => ({
				route: i,
				arrivals: parent.buses[i]
			}))
	},
	Bus: {
		route: parent => parent.route,
		arrivals: parent => parent.arrivals
	}
};

module.exports = {resolvers};

// test
