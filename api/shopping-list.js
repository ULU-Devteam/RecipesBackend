const express = require('express');
const routes = express.Router();
const Ingredient = require('../schema/ingredient.schema');
const ShoppingList = require('../model/shoppingList.model');

routes.get('/shoppingList', function (req, res) {

	ShoppingList.findOne().populate('ingredients')
		.then((list) => {
			res.status(200).json(list);
		})
		.catch((error) => {
			res.status(400).json(error);
		});

});

routes.delete('/shoppingList', function (req, res) {

	ShoppingList.findOne().populate('ingredients')
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

routes.post('/shoppingList/ingredient/:id', (req, res) => {

	Promise.all([
		ShoppingList.findOne().populate('ingredients'),
		Ingredient.findById(req.params.id)
	])
		.then((values) => {
			const list = values[0];
			const ingredient = values[1];

			list.ingredients.push(ingredient);
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
