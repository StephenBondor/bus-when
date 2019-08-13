const {prisma} = require('./src/generated/prisma-client');

async function main() {
	// Create all routes
	try {
		for (let i = 1; i < 4; i++) {
			await prisma.createRoute({
				name: i.toString()
			});
		}
	} catch {}
	console.log('routes: ', await prisma.routes());

	// Create all stops
	try {
		for (let i = 1; i < 11; i++) {
			await prisma.createStop({
				name: i.toString()
			});
		}
	} catch {}
	console.log('stops: ', await prisma.stops());

	// Create all events
	try {
		for (let time = 0; time < 15; time++) {
			for (let stop = 1; stop < 11; stop++) {
				for (let route = 1; route < 4; route++) {
					await prisma.createEvent({
						stop: await prisma.stop({name: stop.toString()}),
						route: await prisma.route({name: '1'})
					});
				}
			}
		}
	} catch {}
	console.log('events: ', await prisma.events());
}

main().catch(e => console.error(e));
