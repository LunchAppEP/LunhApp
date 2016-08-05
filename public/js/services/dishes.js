angular.module('deliveryAppService', [])

    // super simple service
    // each function returns a promise object
    .factory('Menu', function($resource) {
        var resource = $resource('/api/menu', {}, {
            'get': {method: 'GET', isArray: true}
        })
        return resource;
    });;