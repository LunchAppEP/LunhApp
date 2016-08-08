var Order = require(__base + 'models/order');

exports.get = function(req, res) {
    Order.find({}, function (err, orders) {
        if (err) return res.status(400).send(err.message);
        return res.send(orders);
    });
};

exports.getByUserId = function(req, res) {
    Order.find({'user': req.params.userId}, function(err, orders) {
        if (err) return res.status(400).send(err.message);
        res.send(orders);
    });
};

exports.getByDishId = function(req, res) {
    Order.find({'dish': req.params.dishId}, function(err, orders) {
        if (err) return res.status(400).send(err.message);
        res.send(orders);
    })
};

exports.getById = function(req, res) {
    Order.findById(req.params.id, function(err, order) {
        if (err) return res.status(400).send(err.message);
        res.send(order);
    });
};

exports.post = function(req, res) {
    var order = new Order ({
        user: req.body.userId,
        dish: req.body.dishId,
        amount: req.body.amount,
        date: req.body.date
    });
    order.save(function(err) {
        if (err) return res.status(400).send(err.message);
        res.send(order);
    });
};

exports.put = function(req, res) {
    Order.findById(req.params.id, function(err, order) {
        if (err) return res.status(400).send(err.message);

        order.user = req.body.user;
        order.dish = req.body.dish;
        order.amount = req.body.amount;
        order.date = req.body.date;

        order.save(function(err) {
            if (err) return res.status(400).send(err.message);
            res.send(order);
        });
    });
};

exports.delete = function(req, res) {
    Order.findById(req.params.id, function(err, order) {
        if (err) return res.status(400).send(err.message);
        order.remove(function(err) {
            if (err) return res.status(400).send(err.message);
            res.send('OK');
        });
    });
};