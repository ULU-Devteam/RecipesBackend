const mongoose = require('mongoose');
const config = require('./env/env');
const ShoppingList = require('../model/shoppingList.model');

// Gebruik es6 promises ipv mongoose mpromise
mongoose.Promise = global.Promise;

mongoose.connect(config.dburl);
var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + config.dburl))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

ShoppingList.findOne().then((list) => {
	console.log('Creating ShoppingList...');
	if(list == null) {
		list = new ShoppingList({name: 'ShoppingList'});
		list.save();
		console.log('ShoppingList available');
	} else {
		console.log('ShoppingList already available');
	}
});

module.exports = connection;
