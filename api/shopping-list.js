const express = require('express');
const routes = express.Router();
const ShoppingList = require('../model/shoppingList.model');
const IngredientSchema = require('../schema/ingredient.schema');

routes.get('/shoppingList', function (req, res) {

	ShoppingList.findOne()
		.then((list) => {
			res.status(200).json(list);
		})
		.catch((error) => {
			res.status(400).json(error);
		});

});

routes.delete('/shoppingList', function (req, res) {

	ShoppingList.findOne()
		.then((list) => {
			list.ingredients = [];
			list.save()
				.then((savedList) => {
					res.status(200).json(savedList);
				})
				.catch((error) => {
					res.status(400).json(error);
				});
		})
		.catch((error) => {
			res.status(400).json(error);
		});

});

routes.post('/shoppingList/ingredient', (req, res) => {

	ShoppingList.findOne()
		.then((list) => {
			for (let ing of req.body) {
				list.ingredients.push(ing);
			}
			list.save()
				.then((savedList) => {
					res.status(200).json(savedList);
				})
				.catch((error) => {
					res.status(400).json(error);
				});
		})
		.catch((error) => {
			res.status(400).json(error);
		});
});

module.exports = routes;
