const eventList = ({id}, _, {prisma}) => prisma.bus({id: id}).eventList();
const route = ({id}, _, {prisma}) => prisma.bus({id: id}).route();

module.exports = {
	eventList,
	route
};
