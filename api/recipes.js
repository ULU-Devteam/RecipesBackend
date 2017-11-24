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
    let recipe = new Recipe(req.body);
    recipe.save()
        .then((recipe) => {
            res.status(200).json(recipe);
        })
        .catch((error) => {
            res.json(400).json(error);
        });
});

routes.put('/recipes/:id', (req, res) => {
    let recipeId = req.params.id;
    let recipe = req.body;

    Recipe.findByIdAndUpdate(recipeId, recipe)
        .then((recipe) => {
            res.status(200).json(recipe)
        })
        .catch((error) => {
            res.status(400).json(error);
        });

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