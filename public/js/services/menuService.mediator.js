angular.module('getMenuMediatorService', [])

    // super simple service
    // each function returns a promise object
    .factory('getMenuService', ['Menu', function(Menu) {
        var object = {};
        var menu = {};
        function updateMenu() {
            Menu.get().$promise.then(
                function(data){
                    menu.dishes = data.dishes;
                    menu.dinners = data.dinners;
                    menu.thisWeekMenu = thisWeekMenu;
                    return menu;
                },
                function(data){
                });
            object.menu = menu;
            return object;
        }
        function thisWeekMenu (period) {
            var menuArr = [];
            menu.types = [];
            period.forEach(function(item) {
                var result = {};
                result.date = item;
                result.dishes = [];
                result.dinners = [];
                if (menu.dishes.length) {
                    menu.dishes.forEach(function(dish) {
                        if (dish.date == item) {
                            result.dishes.push(dish);
                            if (!menu.types.some(function(element) {return element == dish.type})) {
                                menu.types.push(dish.type);
                            }
                        }

                    });
                }
                if (menu.dinners.length) {
                    menu.dinners.forEach(function (dinner) {
                        if (dinner.date == item) {
                            result.dinners.push(dinner);
                        }
                    });
                }
                menuArr.push(result);
            });

            var notEmptyArr = menuArr.some(function (item) {
                return (item.dishes.length != 0 || item.dinners.length != 0);
            });

            return (notEmptyArr) ? menuArr: false;
        };
        object.updateMenu = updateMenu;
        object.updateMenu();
        object.menu = menu;
        return object;
    }]);
