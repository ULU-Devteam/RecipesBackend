const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
	mongoose.connect('mongodb://localhost/recipemongodb_test');
	mongoose.connection
		.once('open', () => done())
		.on('error', (err) => {
			console.warn('Warning', err);
		});
});

beforeEach((done) => {
	const { shoppinglists } = mongoose.connection.collections;
	shoppinglists.drop()
		.then(() => done())
		.catch(() => done())
});