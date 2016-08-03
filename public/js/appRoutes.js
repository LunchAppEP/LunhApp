angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('menu', {
            url: '/menu',
            templateUrl: 'js/controllers/menu/menu.html',
            controller: 'addController',
            controllerAs: 'vm'
        })
        .state('home', {
            url: '/home',
            template: '<h2 class="da-main__title">Ievgen Lupashko, Ievgeniia Krolitska, Olena Zhyvodorova and Olena Tregub welcome You to order Lunches</h2>'
            // we'll get to this in a bit
        })
        .state('users', {
            url: '/users',
            templateUrl: 'js/controllers/user/user.html'
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

}])