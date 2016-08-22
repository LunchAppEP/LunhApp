angular.module('allWeeksService', [])

    // super simple service
    // each function returns a promise object
    .factory('weeksService', ['$resource', function($resource) {
        var resource = $resource('/api/weeks', {}, {
            'get': {
                method: 'GET',
                isArray: true
            }
        });

        return resource;

    }]);
