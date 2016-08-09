angular.module('addMenuService', [])

    // super simple service
    // each function returns a promise object
    .factory('MenuService', ['$resource', function($resource) {
        var resource = $resource('/uploads', {}, {
            'send': {
                method: 'POST',
                transformRequest: function(file) {
                    var fd = new FormData();
                    fd.append('menuFile', file);
                    return fd;
                },
                headers: {'Content-Type': undefined}
            }
        });
        
        return resource;

    }]);