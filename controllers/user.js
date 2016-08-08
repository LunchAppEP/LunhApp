var User = require(__base + 'models/user');

exports.get = function(req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(400).send(err.message);
        return res.send(users);
    });
};

exports.getById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.status(400).send(err.message);
        res.send(user);
    });
};

exports.post = function(req, res) {
    var user = new User ({
        email: req.body.email,
        fName: req.body.fName,
        lName: req.body.lName,
        balance: 0,
        password: "",
        type: "user"
    });
    user.save(function(err) {
        if (err) return res.status(400).send(err.message);
        res.send(user);
    });
};

exports.changeBalance = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.status(400).send(err.message);

        user.balance = req.body.balance;

        user.save(function(err) {
            if (err) return res.status(400).send(err.message);
            res.send(user);
        });
    });
};

exports.changeName = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.status(400).send(err.message);

        user.fName = req.body.fName;
        user.lName = req.body.lName;

        user.save(function(err) {
            if (err) return res.status(400).send(err.message);
            res.send(user);
        });
    });
};

exports.resetPass = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.status(400).send(err.message);

        user.password = "";

        user.save(function(err) {
            if (err) return res.status(400).send(err.message);
            res.send(user);
        });
    });
};

exports.delete = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.status(400).send(err.message);
        user.remove(function(err) {
            if (err) return res.status(400).send(err.message);
            res.send('OK');
        });
    });
};
