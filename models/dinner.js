/**
 * Created by ievgeniia.krolitska on 7/29/2016.
 */

var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    price: Number,
    dishes: Array,
    date: String,
    provider: String
});
module.exports = mongoose.model('dinner', schema);
