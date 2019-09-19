let moment = require('moment');

const times = async (_, {stop}, {prisma}) =>
	await prisma.events({
		where: {
			time_gte: moment()
				.subtract(1, 'minutes')
				.format(),
			stop: {name: stop}
		}
	});

const stops = async (_, __, {prisma}) =>
	(await prisma.stops()).map(stop => stop.name);

const event = async (_, {id}, {prisma}) => await prisma.event({id: id});

module.exports = {
	times,
	stops,
	event
};
