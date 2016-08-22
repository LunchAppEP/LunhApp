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
        })
        .state('users', {
            url: '/users',
            templateUrl: 'js/controllers/user/user.html',
            controller: 'userController',
            controllerAs: 'vm'
        })
        .state('orders', {
            url: '/orders',
            template: '<p>Orders</p>'
        });

}])