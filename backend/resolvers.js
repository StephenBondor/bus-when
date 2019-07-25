const {nextArrival} = require('./ArrivalTimes');

const resolvers = {
	Query: {
		sanityCheck: () => 'You are not insane',
		time: (parent, args) => ({
			value: args.time,
			stops: nextArrival[args.time]
		})
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
