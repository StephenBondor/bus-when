// This is the basic server start file. All backend server definitions are in './backend/Server'

const {server, options} = require('./backend/Server');
server.start(options, ({port}) => {
	console.log(`\nServer is running on port ${port}\n`);
});
