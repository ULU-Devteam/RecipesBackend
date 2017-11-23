const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'ingredient'
    }]
})

const Recipe = mongoose.model('recipe', RecipeShema);

module.exports = Recipe;