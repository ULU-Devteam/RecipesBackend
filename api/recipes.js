const express = require('express');
const routes = express.Router();
const Recipe = require('../model/recipe.model')
const mongodb = require('../config/mongo.db');
const Ingriedient = require('../model/ingredient.model')

routes.get('/recipes', function(req, res) {
    res.status(200).json('die shit werkt')
});

routes.post('/recipes', (req, res) =>{
    reqRecipe = req.body;
    let ingredientIds = [];

    for(let i of reqRecipe.ingredients){
        let ingredient = new Ingriedient(i)
        ingredient.save()
            .then((ing) => {
                ingredientIds.push(ing._id);

            })
    }

    reqRecipe.ingredients = ingredientIds
    let recipe = new Recipe(reqRecipe);

    recipe.save()
        .then((recipe) => {
            res.status(200).json(recipe);
        })
        .catch((error) =>{
            res.status(400).json(error);
        })





})

module.exports  = routes