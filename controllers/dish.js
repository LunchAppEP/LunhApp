var mongoose = require('mongoose');
var Dish = require(__base + 'models/dish');

exports.get = function(req, res) {
    Dish.find({}, function (err, dishes) {
        if (err) return res.status(400).send(err.message);
        return res.send(dishes);
    });
};

exports.getById = function(req, res) {
    Dish.findById(req.params.id, function(err, dish) {
       if (err) return res.status(400).send(err.message);
        res.send(dish);
    });
};
