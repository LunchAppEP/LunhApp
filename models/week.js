var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    status: String, //open or close
    period: Array //example: array of dates "01/01/2016" 
});
module.exports = mongoose.model('week', schema);