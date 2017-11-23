const express = require('express');
const routes = express.Router();
const Ingredient = require('../model/ingredient.model');
const ShoppingList = require('../model/shoppingList.model');

routes.get('/shoppingList', function (req, res) {
	res.status(200).json('die shit werkt');
});

routes.post('/shoppingList/ingredient/:id', (req, res) => {

	Promise.all([
		ShoppingList.findOne().populate('ingredients'),
		Ingredient.findById(req.params.id)
	]).then((values) => {
		const list = values[0];
		const ingredient = values[1];

		list.ingredients.push(ingredient);
		list.save();
		res.status(200).json(list);
	});

});

module.exports = routes;
