const assert = require('assert');
const Recipe = require('../model/recipe.model');
const Ingredient = require('../schema/ingredient.schema');

describe('Querying the recipes in the database successfully', () => {
    let list;

    beforeEach((done) => {
        list = new Recipe({
            name: 'Recipe',
            imagePath: 'http://google.com/',
            description: 'A description for a recipe',
            ingredients: [{name: 'testingredient', amount: 3}]
        });

        list.save(() => done())

    });

    it('Return a recipe with ingredients', (done) => {
        Recipe.findOne()
            .then((recipe) => {
                assert(recipe.name === 'Recipe');
                assert(recipe.imagePath === 'http://google.com/');
                assert(recipe.description === 'A description for a recipe');
                assert(recipe.ingredients[0].name === 'testingredient');
                done();
            });
    });

    it('Post a recipe to the recipe list', (done) => {
        const postRecipe = [{
            name: 'Recipetest 2',
            imagePath: 'http://google.com/',
            description: 'A description for recipe test 2',
            ingredients: [
                {
                    name: 'Ingredient',
                    amount: 1
                },
                {
                    name: 'Ingredient 2',
                    amount: 5
                }]
        }];
        let recipe = new Recipe(postRecipe[0]);
        recipe.save()
            .then((recipe) => {
                assert(recipe.name === 'Recipetest 2');
                assert(recipe.ingredients.length === 2);
                done();
            });
    });

    it('Updates a recipe with ingredients', (done) => {
        const updateRecipe = [{
            name: 'RecipeUpdate',
            imagePath: 'http://google.com/',
            description: 'A description for recipe test 2',
            ingredients: [
                {
                    name: 'Ingredient',
                    amount: 1
                },
                {
                    name: 'Ingredient 2',
                    amount: 5
                }]
        }];

        Recipe.findOneAndUpdate({name: 'Recipe'}, updateRecipe[0])
            .then((recipe) => {
               Recipe.findOne({name: 'RecipeUpdate'})
                   .then((recipe) => {
                        assert(recipe !== null);
                        done();
                   })
            })

    });

    it('Update an ingredient from a recipe', (done) => {
        const updateRecipe = [{
            name: 'RecipeUpdate 2',
            imagePath: 'http://google.com/',
            description: 'A description for recipe test 2',
            ingredients: [
                {
                    name: 'IngredientUpdate',
                    amount: 4
                },
                {
                    name: 'Ingredient 2',
                    amount: 5
                }]
        }];

        Recipe.findOneAndUpdate({name: 'Recipe'}, updateRecipe[0])
            .then((recipe) => {
                Recipe.findOne({name: 'RecipeUpdate 2'})
                    .then((recipe) => {
                        assert(recipe.ingredients[0].name === 'IngredientUpdate');
                        assert(recipe.ingredients[0].amount === 4);
                        done();
                    });
            });
    });

    xit('Removes a recipe with ingredients', (done) => {

    });

    xit('Remove an ingredient from a recipe', (done) => {

    });

});