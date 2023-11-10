const mongoose = require('mongoose');

const cartsSchema = mongoose.Schema({
    departure:String,
    arrival:String,
    time:Date,
    price:Number,
});

const Cart = mongoose.model('carts',cartsSchema);

module.exports = Cart;