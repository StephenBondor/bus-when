const {nextArrival} = require('./ArrivalTimes');
const STOPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sanityCheck = () => 'You are not insane';

const stopsTest = () => STOPS;

const timeTest = (_, {time}) => ({
	value: time,
	stops: nextArrival[time]
});

module.exports = {
	sanityCheck,
	timeTest,
	stopsTest
};
