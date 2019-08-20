const {prisma} = require('./src/generated/prisma-client');
let moment = require('moment');

// Globals
const NUMBER_OF_STOPS = 10;
const NUMBER_OF_ROUTES = 3;
const ROUTE_DEPARTURE_INTERVAL = 2;
const ROUTE_RESTART_INTERVAL = 15;
const TIME_BETWEEN_STOPS = 2;
const BUS_BUFFER_WINDOW = 75;
const DB_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';
const DB_DATE_FORMAT_ROUNDED = `${DB_DATE_FORMAT.slice(0, 15)}:00.000Z`;
const STARTING_BUS_AMOUNT =
	(BUS_BUFFER_WINDOW / ROUTE_RESTART_INTERVAL) * NUMBER_OF_ROUTES;

async function main() {
	console.log('usage: ');
	console.log(
		"'node seeder d '   - will delete all data in the database before repopulating"
	);
	console.log(
		"'node seeder d f ' - will delete all data in the database and NOT repopulate"
	);

	// Handle deletions
	if (process.argv[2] === 'd') {
		console.log('\nDeleting everything...');
		try {
			await prisma.deleteManyEvents({id_not: '1'});
			await prisma.deleteManyBuses({id_not: '1'});
			await prisma.deleteManyRoutes({id_not: '1'});
			await prisma.deleteManyStops({id_not: '1'});
			console.log('\nAll DB entries cleared...');
			if (process.argv[3] === 'f') return null;
			console.log('\nRepopulating DB...');
		} catch {
			console.log('Was not able to delete everything in the DB');
		}
	} else {
		console.log('\nPopulating DB...');
	}

	// Create all stops
	try {
		for (let stop = 0; stop < NUMBER_OF_STOPS; stop++) {
			await prisma.createStop({
				name: (stop + 1).toString()
			});
		}
		console.log('\n - stops seeded successfully');
	} catch {
		console.log(' - stops already seeded successfully');
	}

	// Create all routes, each with a full stop list
	let stopList = await prisma.stops();
	try {
		for (let route = 0; route < NUMBER_OF_ROUTES; route++) {
			await prisma.createRoute({
				name: (route + 1).toString(),
				stopList: {
					connect: stopList.map(stop => ({
						id: stop.id
					}))
				}
			});
		}
		console.log(' - routes seeded successfully');
	} catch {
		console.log(' - routes already seeded successfully');
	}

	// Create starting Buses
	let addedTime;
	let now = moment().format('mm');
	let subtract = (now % ROUTE_RESTART_INTERVAL) + ROUTE_RESTART_INTERVAL;
	let startTime = moment().subtract(subtract, 'minutes');
	const addBus = async (addedTime, route) =>
		await prisma.createBus({
			startTime: startTime
				.clone()
				.add(addedTime, 'minutes')
				.format(DB_DATE_FORMAT_ROUNDED),
			route: {connect: {name: (route + 1).toString()}}
		});
	if ((await prisma.buses()).length < STARTING_BUS_AMOUNT) {
		for (let i = 0; i < BUS_BUFFER_WINDOW; i = i + ROUTE_RESTART_INTERVAL) {
			for (let route = 0; route < NUMBER_OF_ROUTES; route++) {
				addedTime = ROUTE_DEPARTURE_INTERVAL * route + i;
				await addBus(addedTime, route);
			}
		}
		console.log(' - buses seeded successfully');
	} else {
		console.log(' - buses already seeded successfully');
	}

	// Create events for all starting busses
	let time;
	let oldTime;
	const addEvents = async bus => {
		for (let stop = 0; stop < NUMBER_OF_STOPS; stop++) {
			oldTime = moment(bus.startTime, DB_DATE_FORMAT);
			time = oldTime.add(stop * TIME_BETWEEN_STOPS, 'minute');
			await prisma.createEvent({
				stop: {connect: {name: (stop + 1).toString()}},
				bus: {connect: {id: bus.id}},
				time: `${time.format(DB_DATE_FORMAT)}Z`
			});
		}
	};
	if (
		(await prisma.events()).length <
		STARTING_BUS_AMOUNT * NUMBER_OF_STOPS
	) {
		const buses = await prisma.buses();
		buses.map(bus => addEvents(bus));
		console.log(' - events seeded successfully');
	} else {
		console.log(' - events already seeded successfully');
	}

	// Initial Seeding finished
	console.log(
		'\nSeeding successful!\n\nNow entering continuous deployment every',
		ROUTE_RESTART_INTERVAL,
		'minutes... ( control + c to Quit ), ',
		moment([]).format('DD HH:mm:ss'),
		'\n'
	);

	// Ongoing seeding
	let additionalTime = BUS_BUFFER_WINDOW;
	let newBusList = [];
	let id = setInterval(async () => {
		// Add new buses
		for (let route = 0; route < NUMBER_OF_ROUTES; route++) {
			addedTime = ROUTE_DEPARTURE_INTERVAL * route + additionalTime;
			newBusList.push(await addBus(addedTime, route));
		}

		// Add new events for those buses
		newBusList.map(bus => addEvents(bus));

		// Alert / Reset / increment
		console.log(
			' - Fresh buses scheduled and queued for period',
			additionalTime,
			'min from start',
			moment([]).format('DD HH:mm:ss')
		);
		newBusList = [];
		additionalTime = additionalTime + ROUTE_RESTART_INTERVAL;
	}, 1000 * 60 * ROUTE_RESTART_INTERVAL);
}

main().catch(e => console.error(e));
