var Week = require(__base + 'models/week');


exports.put = function(req, res) {
    Week.findById(req.params.id, function(err, week) {
        if (err) return res.status(400).send(err.message);
        week.status = req.body.status;
        week.save(function(err) {
            if (err) return res.status(400).send(err.message);
            res.send(week);
        });

    });
};


// exports.createWeek = function(req, res) {
//     week.save(function(err) {
//     if (err) return res.status(400).send(err.message);
//     res.send(week);
//        
//     });
// };

exports.get = function(req, res) {
    Week.find({}, function (err, weeks) {
        if (err) return res.status(400).send(err.message);
        return res.send(weeks);
    });
};