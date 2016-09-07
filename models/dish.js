var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: String,
    price: Number,
    weight: Number,
    date: String, //example "01/01/2016"
    type: String, 
    provider: String
});
module.exports = mongoose.model('dish', schema);