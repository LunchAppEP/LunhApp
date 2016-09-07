var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    user: String, //userID
    dish: String, //dishID
    amount: Number,
    date: String, //example "01/01/2016"
    //price: Number
});
module.exports = mongoose.model('order', schema);