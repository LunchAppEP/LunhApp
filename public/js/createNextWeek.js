/**
 * Created by ievgen.lupashko on 8/11/2016.
 */

var Week = require(__base + 'models/week');

module.exports = {

    findNextMonday:  function(){
        var now = new Date();
        var nextWeekMonday = new Date();
        nextWeekMonday.setDate(now.getDate() + 8);
        while (nextWeekMonday.getDay() != 1) {
            nextWeekMonday.setDate(nextWeekMonday.getDate() - 1);
        }
        return nextWeekMonday;
    },

    createNextWeek: function(){

        var nextWeekMonday = this.findNextMonday();

            console.log(nextWeekMonday + '12');

            // week.createWeek(nextWeekMonday);

            var weekDates = []; //создаем на наполняем массив датами которые хотим удалить из БД
            for (var t = 0; t < 5; t++) {
                weekDates[t] = nextWeekMonday.getDate() + t + '/' + (nextWeekMonday.getMonth() + 1) + '/' + nextWeekMonday.getFullYear();
            }

            var week = new Week({
                status: 'open',
                period: weekDates
            });

        week.save(function(err) {
            if (err) throw err;
        });

    }


    
    // createNextWeek();

    // setInterval(createNextWeek,3000 )


}