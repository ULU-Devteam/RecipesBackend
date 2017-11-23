const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppingListItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const ShoppingListItem = mongoose.model('ingredient', ShoppingListItemSchema);

module.exports = ShoppingListItem;
