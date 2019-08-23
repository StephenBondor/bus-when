let moment = require('moment');

const times = async (_, {stop}, {prisma}) => {
	const queryTime = moment()
		.subtract(30, 'seconds')
		.format();
	return await prisma.events({
		where: {
			time_gte: queryTime,
			stop: {name: stop}
		}
	});
};

const stops = async (_, __, {prisma}) =>
	(await prisma.stops()).map(stop => stop.name);

const event = async (_, {id}, {prisma}) => await prisma.event({id: id});

module.exports = {
	times,
	stops,
	event
};
