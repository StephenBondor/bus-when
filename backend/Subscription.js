const updateEvent = {
	subscribe: (parent, args, context, info) =>
		context.prisma.$subscribe.event({mutation_in: ['UPDATED']}).node(),
	resolve: payload => payload
};

const newEvent = {
	subscribe: (parent, args, context, info) =>
		context.prisma.$subscribe.event({mutation_in: ['CREATED']}).node(),
	resolve: payload => payload
};

module.exports = {
	updateEvent,
	newEvent
};
