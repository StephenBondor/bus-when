// Integration Testing Resolvers
const TimeTypeTest = {
	value: ({value}) => value,
	stop: ({stops}, {name}) => ({
		name,
		buses: stops[name]
	})
};
const StopTypeTest = {
	name: ({name}) => name,
	buses: ({buses}) =>
		Object.keys(buses).map(i => ({
			route: i,
			arrivals: buses[i]
		}))
};
const BusTypeTest = {
	route: ({route}) => route,
	arrivals: ({arrivals}) => arrivals
};

module.exports = {
	TimeTypeTest,
	StopTypeTest,
	BusTypeTest
};
