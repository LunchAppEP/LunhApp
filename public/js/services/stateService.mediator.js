angular.module('createStateService', [])
    .factory('stateService', ['weeksService', function(weeksService) {
        var state = {};
        weeksService.get().$promise.then(function(data) {
            var weeksArr = data;
            state.weeks = [];
            for (var i = 0; i < weeksArr.length; i++) {
                var titles = ['Previous week', 'This week', 'Next week'];
                if (weeksArr.length == 2) {
                    var types = ['last', 'next'];
                    state.weeks.push({
                        title: titles[i+1],
                        type: types[i],
                        period: weeksArr[i].period,
                        status: weeksArr[i].status,
                        id: weeksArr[i]._id
                    });
                } else {
                    var types = ['last', 'this', 'next'];
                    state.weeks.push({
                        title: titles[i],
                        type: types[i],
                        period: weeksArr[i].period,
                        status: weeksArr[i].status,
                        id: weeksArr[i]._id
                    });
                }
            }
            state.currentWeekIndex = (state.weeks.length == 2) ? 0 : 1;
            state.currentWeek = state.weeks[state.currentWeekIndex];
            var today = moment();
            state.today = today.format('DD/MM/YYYY');
            state.currentWeek.period.forEach(function(item, index) {
                state.currentDayIndex = 0;
                if (state.today == item) {
                    state.currentDayIndex = index;
                }
            });
            state.currentDay = state.currentWeek.period[state.currentDayIndex];
            return state;
        },
        function(data) {
        });

        state.changeWeekIndex = function(type) {
            state.currentWeekIndex = (type == 'deduct') ?  state.currentWeekIndex-1: state.currentWeekIndex+1;
            state.currentWeek = state.weeks[state.currentWeekIndex];
            state.currentWeek.period.forEach(function(item, index) {
                state.currentDayIndex = 0;
                if (state.today == item) {
                    state.currentDayIndex = index;
                }
            });
            state.currentDay = state.currentWeek.period[state.currentDayIndex];
        };
        state.changeDayIndex = function(index) {
            state.currentDayIndex = index;
            state.currentDay = state.currentWeek.period[state.currentDayIndex];
        };
        return state;
    }]);
