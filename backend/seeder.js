const {prisma} = require('./src/generated/prisma-client');
let moment = require('moment');

// Globals
const NUMBER_OF_STOPS = 10;
const NUMBER_OF_ROUTES = 3;
const FIRST_BUS_START_MINUTE = 0;
const ROUTE_DEPARTURE_INTERVAL = 2;
const ROUTE_RESTART_INTERVAL = 15;
const TIME_BETWEEN_STOPS = 2;

const DB_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';

async function main() {
	// Create all stops
	try {
		for (let stop = 0; stop < NUMBER_OF_STOPS; stop++) {
			await prisma.createStop({
				name: (stop + 1).toString()
			});
		}
		// console.log('stops: ', await prisma.stops());
		console.log('stops seeded successfully\n');
	} catch {
		console.log('stops already seeded successfully\n');
	}

	// Create all routes, each with a full stop list
	try {
		for (let route = 0; route < NUMBER_OF_ROUTES; route++) {
			await prisma.createRoute({
				name: (route + 1).toString(),
				stopList: {
					connect: [
						...(await prisma.stops()).map(stop => ({
							id: stop.id
						}))
					]
				}
			});
		}
		// console.log('routes: ', await prisma.routes());
		console.log('routes seeded successfully\n');
	} catch {
		console.log('routes already seeded successfully\n');
	}

	// Create starting Buses, except the buses finishing from the previous hour
	console.log(
		'section of the hour to start at: ',
		moment().format('mm') - (moment().format('mm') % ROUTE_RESTART_INTERVAL)
	);
	if ((await prisma.buses()).length === 0) {
		for (
			let startTime = FIRST_BUS_START_MINUTE;
			startTime < 60;
			startTime = startTime + ROUTE_RESTART_INTERVAL
		) {
			for (let route = 0; route < NUMBER_OF_ROUTES; route++) {
				await prisma.createBus({
					startTime: `${moment().format(
						'YYYY-MM-DDTHH:'
					)}${startTime + route * ROUTE_DEPARTURE_INTERVAL}:00.000Z`,
					route: {connect: {name: (route + 1).toString()}}
				});
			}
		}
		// console.log('buses: ', await prisma.buses());
		console.log('buses seeded successfully\n');
	} else {
		console.log('buses already seeded successfully\n');
	}

	// Create events
	if ((await prisma.events()).length === 0) {
		const buses = await prisma.buses();
		let [time, oldTime] = [0, 0];
		buses.map(async bus => {
			for (let stop = 0; stop < NUMBER_OF_STOPS; stop++) {
				oldTime = moment(bus.startTime, DB_DATE_FORMAT);
				time = oldTime.add(stop * TIME_BETWEEN_STOPS, 'minute');
				await prisma.createEvent({
					stop: {connect: {name: (stop + 1).toString()}},
					bus: {connect: {id: bus.id}},
					time: `${time.format(DB_DATE_FORMAT)}Z`
				});
			}
		});
		// console.log('events: ', await prisma.events());
		console.log('events seeded successfully\n');
	} else {
		console.log('events already seeded successfully\n');
	}
}

main().catch(e => console.error(e));
