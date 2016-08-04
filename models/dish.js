var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: String,
    price: Number,
    weight: Number,
    date: String,
    type: String,
    provider: String
});
module.exports = mongoose.model('dish', schema);