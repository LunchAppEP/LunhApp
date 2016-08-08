var mongoose = require('mongoose');
var Dinners = mongoose.model('dinner');
var Dishes = mongoose.model('dish');

exports.get = function(req, res) {

    Dishes.find({}, function (err, dishes) {
        var menu = {};
        if (err) return res.status(400).send(err.message);
        menu.dishes = dishes;
        Dinners.find({}, function (err, dinners) {
            if (err) return res.status(400).send(err.message);
            menu.dinners = dinners;
            return res.send(menu);
        });
    });
};
