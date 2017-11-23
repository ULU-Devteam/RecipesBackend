const express = require('express');
const routes = express.Router();
const Recipe = require('../model/recipe.model');
const mongodb = require('../config/mongo.db');
const Ingriedient = require('../schema/ingredient.schema');

routes.get('/recipes', (req, res) => {
    Recipe.find()
        .then((recipes) =>{
            res.status(200).json(recipes);
        })
        .catch(() => {
            res.status(400).json({'error' : 'bad request'})
        })
});

routes.get('/recipes/:id', (req, res) => {
    let recipeId = req.params.id;

    Recipe.findOne({_id : recipeId})
        .then((recipe) =>{
            res.status(200).json(recipe);
        })
        .catch(() => {
            res.status(400).json({'error' : 'bad request'})
        })
});

routes.post('/recipes', (req, res) =>{
    reqRecipe = req.body;
    let ingredientIds = [];
    promiseArray = [];

    for(let i of reqRecipe.ingredients){
        let ingredient = new Ingriedient(i);
        promiseArray.push(ingredient.save());
    }

    Promise.all(promiseArray)
        .then((result) => {
            for(let r of result){
                ingredientIds.push(r._id);
            }
            reqRecipe.ingredients = ingredientIds;
            let recipe = new Recipe(reqRecipe);

            recipe.save()
                .then((recipe) => {
                    res.status(200).json(recipe);
                })
                .catch((error) =>{
                    res.status(400).json(error);
                });
        });
});

routes.put('/recipes/:id', (req, res) => {
    let recipeId = req.params.id;
    let recipe = req.body;

    Recipe.findOneAndUpdate(
        recipeId,
        {name: recipe.name},
        {imagePath: recipe.imagePath},
        {description: recipe.description},)
        .then((recipe) =>{
            Recipe.findById(recipeId);
            res.status(200).json(recipe);
        })
        .catch(() => {
            res.status(400).json({'error' : 'bad request'})
        })
});

routes.delete('/recipes/:id', (req, res) =>{
    let recipeId = req.params.id;

    Recipe.findOneAndRemove({_id: recipeId})
        .then(() => {
            res.status(200).json({'id': recipeId});
        })
        .catch(() => {
                res.status(400).json({'error' : 'bad request'})
        })
});

module.exports  = routes;