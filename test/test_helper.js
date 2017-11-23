const mongoose = require('mongoose');
const mocha = require('mocha');

mongoose.Promise = global.Promise;

// beforeEach((done) => {
//
// 	const { shoppingList, ingredients, recipes } = mongoose.connection.collections;
// 	shoppingList.drop()
// });