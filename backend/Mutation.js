let moment = require('moment');

const DB_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';
const UNITS = 'seconds';

const updateEvent = async (_, {id}, {prisma}) => {
	// Get the original time of the event
	const originalTime = await prisma.event({id}).time();
	// Get the full list of events that the bus at this events has
	const busEventList = await prisma
		.event({id})
		.bus()
		.eventList();
	// Find the index of current event in that list of events and get all events after it
	const index = busEventList.findIndex(e => e.id === id);
	const busEventListToChange = busEventList.slice(index);
	// Figure out how much time needs to be added to each event
	const addedTime = moment().diff(moment(originalTime), UNITS);
	// For each event in the list, update that events time in the database
	let listOfUpdatedEvents = [];
	let newEvent;
	for (let i = 0; i < busEventListToChange.length; i++) {
		newEvent = await prisma.updateEvent({
			where: {id: busEventListToChange[i].id},
			data: {
				time: `${moment(busEventListToChange[i].time, DB_DATE_FORMAT)
					.add(addedTime, UNITS)
					.format(DB_DATE_FORMAT)}Z`
			}
		});
		listOfUpdatedEvents.push(newEvent);
	}
	console.log(addedTime, ` ${UNITS} was added to a route`);
	return listOfUpdatedEvents;
};

module.exports = {
	updateEvent
};
