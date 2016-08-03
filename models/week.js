var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    status: String, //open or close
    period: Array
});
module.exports = mongoose.model('week', schema);