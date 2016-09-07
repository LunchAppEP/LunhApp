var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: String, //example "name.surname@engagepoint.com"
    password: String,
    balance: Number,
    type: String, //"user or admin"
    fName: String,
    lName: String
});
module.exports = mongoose.model('user', schema);