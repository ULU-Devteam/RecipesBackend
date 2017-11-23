const express = require('express');
const routes = express.Router();
// const mongodb = require('../config/mongo.db');
// const User = require('../model/user.model');

routes.get('/recipes', function(req, res) {
    res.status(200).json('die shit werkt')
});

module.exports  = routes