let moment = require('moment');

const times = async (_, {time: queryTime, stop}, {prisma}) =>
	(await prisma.events({
		where: {
			time_gte: queryTime,
			stop: {name: stop}
		}
	}).$fragment(`
		fragment FooBar on Event { time bus { route { name } } }
	`)).reduce((r, {time, bus}) => {
		let dur = moment(time).diff(moment(queryTime), 'minutes');
		let name = bus.route.name;
		let index = r.findIndex(({route}) => route === name);
		if (index != -1) r[index].arrivals.push(dur);
		else r.push({route: name, arrivals: [dur]});
		return r;
	}, []);

const stops = async (_, __, {prisma}) =>
	(await prisma.stops()).map(stop => stop.name);

module.exports = {
	times,
	stops
};
