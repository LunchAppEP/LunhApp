angular.module('userService', [])

    // super simple service
    // each function returns a promise object
    .factory('User', function($resource) {
        return $resource('/api/users', {}, {
            'get': {method: 'GET', isArray: true},
            'post':
        });
    });
