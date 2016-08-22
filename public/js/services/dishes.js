angular.module('deliveryAppService', [])

    // super simple service
    // each function returns a promise object
    .factory('Menu', function($resource) {
        return $resource('/api/menu', {}, {
            'get': {method: 'GET'}
        });
    });