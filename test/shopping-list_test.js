const assert = require('assert');
const ShoppingList = require('../model/shoppingList.model');
const Ingredient = require('../model/ingredient.model');

describe('Querying the shopping-list in the database successfully', () => {
	let list, testIngredient;

	beforeEach((done) => {
		testIngredient = new Ingredient({ name: 'testingredient', amount: 2 });
		list = new ShoppingList({ name: 'testlist' });
		list.ingredients.push(testIngredient);

		Promise.all([testIngredient.save(), list.save()])
			.then(() => done());
	});

	it('returns a shopping-list with ingredients', (done) => {
		ShoppingList.findOne({})
			.populate('ingredients')
			.then((shoppingList) => {
			console.log(shoppingList);
			assert(shoppingList.name === 'testlist');
			assert(shoppingList.ingredients[0].name === 'testingredient');
			done();
			});
	});

	it('posts a ingredient to the shopping-list', (done) => {
		done();
	});
});