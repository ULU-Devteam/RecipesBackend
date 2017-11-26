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

    xit('Post a recipe to the recipe list', (done) => {
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
        recipe.save()
            .then(() => {
                assert(recipe.isNew);
                done();
            });
        // Recipe.findOne()
        //     .then((recipe) => {
        //         for (let item of postRecipe) {
        //             recipe.push(item)
        //         }

                // recipe.save()
                //     .then(() => {
                //         assert(recipe.isNew);
                //         done();
                //     });
            // });
    });

    xit('Updates a recipe with ingredients', (done)=>{

    });

    xit('Update an ingredient from a recipe', (done) => {

    });

    xit('Removes a recipe with ingredients', (done) => {

    });

    xit('Remove an ingredient from a recipe', (done) => {

    });

});