angular.module('getMenuMediatorService', [])

    // super simple service
    // each function returns a promise object
    .factory('getMenuService', ['Menu', function(Menu) {
        var menu = {};
        Menu.get().$promise.then(
            function(data){
                menu.allItems = data;
                
                menu.allItems.thisWeekMenu = function(period) {
                    var menuArr = [];
                    menu.allItems.types = [];
                    period.forEach(function(item) {
                        var result = {};
                        result.date = item;
                        result.dishes = [];
                        result.dinners = [];
                        menu.allItems.dishes.forEach(function(dish) {
                            if (dish.date == item) {
                                result.dishes.push(dish);
                                if (!menu.allItems.types.some(function(element) {return element == dish.type})) {
                                    menu.allItems.types.push(dish.type);
                                }
                            }

                        });
                        menu.allItems.dinners.forEach(function(dinner) {
                            if (dinner.date == item) {
                                result.dinners.push(dinner);
                            }
                        });
                        menuArr.push(result);
                    });

                    return menuArr;
                };
                return menu;
            },
            function(data){
            });

        return menu;
    }]);
