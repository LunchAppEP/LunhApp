var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: String,
    password: String,
    balance: Number,
    type: String,
    fName: String,
    lName: String
});
module.exports = mongoose.model('user', schema);