var deliveryApp = angular.module('deliveryApp', ['ui.router']);

deliveryApp.controller('DbInfo', function DbInfo($scope) {
    var vm = this;
    vm.dishes = [
        {
            name: 'Салат «Купеческий» (куриное филе, грибы маринованные, яблоко, яйцо, майонез)',
            price: 15,
            weight: 150
        }, {
            name: 'Салат «Оливье»',
            price: 11,
            weight: 150
        }, {
            name: 'Окрошка домашняя на сметане',
            price: 18,
            weight: 350
        }
    ];
});

deliveryApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('menu', {
            url: '/menu',
            templateUrl: 'templates/menu.html',
            controller: 'DbInfo',
            controllerAs: 'db'
        })
        .state('home', {
            url: '/home',
            template: '<h2 class="da-main__title">Ievgen Lupashko, Ievgeniia Krolitska, Olena Zhyvodorova and Olena Tregub welcome You to order Lunches</h2>'
            // we'll get to this in a bit
        })
        .state('users', {
            url: '/users',
            template: '<p>Users</p>'
            // we'll get to this in a bit
        })
        .state('orders', {
            url: '/orders',
            template: '<p>Orders</p>'
            // we'll get to this in a bit
        })
        .state('order', {
            url: '/order',
            template: '<p>Order</p>'
            // we'll get to this in a bit
        });

})
