angular.module('menuController', [])

    .controller('dbController', ['Menu', function(Menu) {
        var vm = this;
        vm.days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
        // $http.get('/api/menu')
        //     .success(function(data) {
        //         console.log(data);
        //         vm.dishes = data;
        //     })
        //     .error(function (data) {
        //         console.log(data);
        //     });
        vm.dishes =  Menu.get()
    }]);

