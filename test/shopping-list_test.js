const assert = require('assert');
const ShoppingList = require('../model/shoppingList.model');
const Ingredient = require('../schema/ingredient.schema');

describe('Querying the shopping-list in the database successfully', () => {
	let list;

	beforeEach((done) => {
		list = new ShoppingList({ name: 'testlist', ingredients: [{ name: 'testingredient', amount: 3}] });

		list.save(() => done())
	});

	it('returns a shopping-list with ingredients', (done) => {
		ShoppingList.findOne()
			.then((shoppingList) => {
			assert(shoppingList.name === 'testlist');
			assert(shoppingList.ingredients[0].name === 'testingredient');
			done();
			});
	});


	it('posts an ingredient to the shopping-list', (done) => {
		const postBody = [{ name: 'postTest1', amount: 2 }, { name: 'postTest2', amount: 3 }]

		ShoppingList.findOne()
			.then((shoppingList) => {
			for (let item of postBody) {
				shoppingList.ingredients.push(item)
			}

			shoppingList.save()
				.then((savedList) => {
				assert(savedList.ingredients.length === 3);
				assert(savedList.ingredients[1].name === 'postTest1');
				done();
				});
			});
	});

	it('removes an ingredient to the shopping-list', (done) => {
		done();
	});
});