angular.module('deliveryAppService', [])

    // super simple service
    // each function returns a promise object
    .factory('Menu', function($resource) {
        var resource = $resource('/api/menu', {}, {
            'get': {method: 'GET', isArray: true}
        })
        return resource;
    });



// super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object
// each function returns a promise object    // super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object
// each function returns a promise object    // super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object
// each function returns a promise object    // super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object    // super simple service
// each function returns a promise object