module.exports = {

    checkDay: function() {
        var moment = require('moment');
        var today = moment();
        if (today.day() == 1) {
            this.getExtraWeek();
        } else {
            console.log('Not Monday!');
        }
    },

    getExtraWeek: function() {
        var initData = require('./initialData.js');
        var Week = require(__base + 'models/week');
        var extraWeekDays = [];
        for (var i = 0; i < 5; i++) {
            extraWeekDays.push(moment().day(-13+i).format('DD/MM/YYYY'));
        };
        var extraWeek = Week.find({'period' : extraWeekDays}, function(err, week) {
            return week;
        });
        this.deleteOrders(extraWeek);
        this.deleteWeek(extraWeek);
        initData.createWeek(8);
    },

    deleteOrders: function(week) {
        var Orders = require(__base + 'models/order');
        week.period.forEach(function(item) {
            Orders.remove({'date' : item}, function(err) {
                if (err) {
                    console.log(err);
                }
            })
        });
    },

    deleteWeek: function(week) {
        var Week = require(__base + 'models/week');
        Week.remove({'period' : week.period}, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
}
