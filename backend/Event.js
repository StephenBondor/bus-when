const stop = ({id}, _, {prisma}) => prisma.event({id: id}).stop();
const bus = ({id}, _, {prisma}) => prisma.event({id: id}).bus();

module.exports = {
	stop,
	bus
};
