module.exports = {

    findUsers: function() {
        var User = require(__base + 'models/user');
        var initData = require('./initialData.js');
        var users = User.find({}, function (err, users) {

            if (users.length > 0) {
                initData.checkAdmin(users);
            } else {
                initData.createAdmin();
            }
        });

    },

    checkAdmin: function(arr) {
        var isAdmin = arr.some(function(user) {
            return user.type == 'admin';
        });
        if (!isAdmin) {
            this.createAdmin();
        } else {
            console.log('Admin Exists!');
        }
    },

    createAdmin: function() {
        var User = require(__base + 'models/user');
        var Admin = new User({
            type: 'admin',
            balance: 0,
            fName: 'Admin',
            lName: 'Engagepoint',
            email: 'admin.engagepoint@engagepoint.com',
            password: 'firstLogin'
        });
        Admin.save(function(err) {
            if (err) throw err;
        });
    },

    findWeeks: function() {
        var Week = require(__base + 'models/week');
        var initData = require('./initialData.js');
        var weeks = Week.find({}, function (err, weeks) {
            console.log(weeks.length);
            if (weeks.length > 0) {
                initData.checkWeeks(weeks);
            } else {
                initData.createWeek(1);
                initData.createWeek(8);
            }
            return weeks;
        });

    },

    checkWeeks: function(arr) {
        var moment = require('moment');
        var Week = require(__base + 'models/week');
        var thisWeekExists = arr.some(function(item) {
            var result = item.period.some(function(day) {
                return (day == moment().day(1).format('DD/MM/YYYY'))
            });
            return result;
        });

        var previousWeekExists = arr.some(function(item) {
            var result = item.period.some(function(day) {
                return (day == moment().day(-6).format('DD/MM/YYYY'))
            });
            return result;
        });

        var nextWeekExists = arr.some(function(item) {
            var result = item.period.some(function(day) {
                return (day == moment().day(8).format('DD/MM/YYYY'))
            });
            return result;
        });
        console.log(moment().day(8).format('DD/MM/YYYY'));

        console.log(thisWeekExists + ' ' + previousWeekExists + ' ' + nextWeekExists);

        if (!nextWeekExists) {
            if (!thisWeekExists) {
                if (!previousWeekExists) {
                    Week.remove({}, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                this.createWeek(1);
            }
            this.createWeek(8);
        } else {
            console.log('There is all weeks!');
        }
        
    },

    createWeek: function(index) {
        var moment = require('moment');
        var Week = require(__base + 'models/week');
        var days = [];
        for (var i = 0; i < 5; i++) {
            days.push(moment().day(index+i).format('DD/MM/YYYY'));
        };
        var status = 'close'
        if (index == 8) {
            var status = 'open';
        }
        var newWeek = new Week({
            period: days,
            status: status
        });
        newWeek.save(function(err) {
            if (err) throw err;
        });
    }
}

