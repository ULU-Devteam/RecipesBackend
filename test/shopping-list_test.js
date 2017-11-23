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
		ShoppingList.findOne()
			.populate('ingredients')
			.then((shoppingList) => {
			assert(shoppingList.name === 'testlist');
			assert(shoppingList.ingredients[0].name === 'testingredient');
			done();
			});
	});


	it('posts an ingredient to the shopping-list', (done) => {
		const postIngredient = new Ingredient({ name: 'postedIngredient', amount: 6 });

		postIngredient.save().then((result) => {
			Promise.all([
				ShoppingList.findOne().populate('ingredients'),
				Ingredient.findById(result._id)
			]).then((values) => {
				const list = values[0];
				const ingredient = values[1];

				list.ingredients.push(ingredient);
				list.save()
					.then((savedList) => {
						assert(savedList.ingredients.length === 2);
						assert(savedList.ingredients[1].name === 'postedIngredient');
						done();
				});
			});
		});
	});

	it('removes an ingredient to the shopping-list', (done) => {
		done();
	});
});