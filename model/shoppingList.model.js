const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IngredientSchema = require('../schema/ingredient.schema');

const ShoppingListSchema = new Schema({
	name: String,
	ingredients: [IngredientSchema]
});

const ShoppingList = mongoose.model('shoppingList', ShoppingListSchema);

module.exports = ShoppingList;
