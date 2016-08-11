angular.module('userServiceModule', [])

    // super simple service
    // each function returns a promise object
    .factory('userService', function($resource) {
        return $resource('/api/users', {}, {
            'get': {method: 'GET', isArray: true},
            'save': {
                method: 'POST'
            }
        });
    });
