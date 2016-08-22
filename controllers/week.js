var Week = require(__base + 'models/week');

exports.get = function(req, res) {
    Week.find({}, function (err, weeks) {
        if (err) return res.status(400).send(err.message);
        return res.send(weeks);
    });
};
