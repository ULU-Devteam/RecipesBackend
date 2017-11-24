const express = require('express');
const routes = express.Router();
const ShoppingList = require('../model/shoppingList.model');
const mongoose = require('mongoose');

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
			if (req.body instanceof Array) {
				for (let ing of req.body) {
					list.ingredients.push(ing);
				}
			} else {
				list.ingredients.push(req.body);
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

routes.delete('/shoppingList/ingredient/:id', (req, res) => {

	const id = mongoose.Types.ObjectId(req.params.id);

	ShoppingList.findOne()
		.then((list) => {
			list.ingredients.id(id).remove()
				.catch((error) => {
					res.status(400).json(error);
				});
			return list;
		})
		.then((list) => {
			list.save()
				.then(() => {
					res.status(200).json(list);
				})
				.catch((error) => {
					res.status(400).json(error);
				})
		})
		.catch((error) => {
			res.status(400).json(error);
		});

});

routes.put('/shoppingList/ingredient/:id', (req, res) => {

	const id = mongoose.Types.ObjectId(req.params.id);
	const ingredient = req.body;

	ShoppingList.findOne()
		.then((list) => {
			list.ingredients.id(id).set(ingredient);
			return list;
		})
		.then((list) => {
			list.save()
				.then(() => {
					res.status(200).json(list);
				})
				.catch((error) => {
					res.status(400).json(error);
				})
		})
		.catch((error) => {
			res.status(400).json(error);
		});

});

module.exports = routes;
