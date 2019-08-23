const stopList = ({id}, _, {prisma}) => prisma.route({id: id}).stopList();

module.exports = {
	stopList
};
