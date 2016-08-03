var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    user: String,
    dish: String,
    amount: Number,
    date: String,
    //price: Number
});
module.exports = mongoose.model('order', schema);