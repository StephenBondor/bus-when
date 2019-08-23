let moment = require('moment');

const DB_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';
const UNITS = 'minutes';

const updateEvent = async (_, {id, time}, {prisma}) => {
	// 0. Get the original time of the event
	const originalTime = await prisma.event({id}).time();
	// 1. Get the full list of events that the bus at this events has
	const busEventList = await prisma
		.event({id})
		.bus()
		.eventList();
	// 2. Find the index of current event in that list of events and get all events after it
	const index = busEventList.findIndex(e => e.id === id);
	const busEventListToChange = busEventList.slice(index);
	// 3. Figure out how much time needs to be added to each event
	const addedTime = moment().diff(moment(originalTime), UNITS);
	console.log(addedTime, ` ${UNITS} was added to a route`);
	// 4. For each event in the list, add that time to the events time in the database
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
	// 5. Return the list of updated events
	return listOfUpdatedEvents;
};

module.exports = {
	updateEvent
};
