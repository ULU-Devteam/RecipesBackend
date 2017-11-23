const express = require('express');
const routes = express.Router();
const Recipe = require('../model/recipe.model')
const mongodb = require('../config/mongo.db');

routes.get('/recipes', function(req, res) {
    res.status(200).json('die shit werkt')
});

routes.post('/recipes', (req, res) =>{
    let recipe = new Recipe(req.body);
    recipe.save()
        .then((recipe) => {
            res.status(200).json(recipe);
        })
        .catch((error) =>{
            res.status(400).json(error);
        })
})

module.exports  = routes