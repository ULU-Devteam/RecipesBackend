const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IngredientSchema = require('../schema/ingredient.schema');

const RecipeShema = new Schema({
    name: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [IngredientSchema]
})

const Recipe = mongoose.model('recipe', RecipeShema);

module.exports = Recipe;