
var Dinner = require(__base + 'models/dinner');

exports.get = function(req, res) {
    Dinner.find({}, function (err, dinners) {
        if (err) return res.status(400).send(err.message);
        return res.send(dinners);
    });
};

exports.getById = function(req, res) {
    Dinner.findById(req.params.id, function(err, dinner) {
        if (err) return res.status(400).send(err.message);
        res.send(dinner);
    });
};