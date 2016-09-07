var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    price: Number,
    dishes: Array,
    date: String, //example "01/01/2016"
    provider: String
});
module.exports = mongoose.model('dinner', schema);
