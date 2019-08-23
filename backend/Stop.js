const eventList = ({id}, _, {prisma}) => prisma.stop({id: id}).eventList();

module.exports = {
	eventList
};
