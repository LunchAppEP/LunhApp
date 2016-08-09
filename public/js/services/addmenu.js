angular.module('addMenuService', [])

    // super simple service
    // each function returns a promise object
    .factory('Menu', ['$resource', function($resource) {
        return {
            'send': uploadFileToUrl
        }
        function uploadFileToUrl(file, uploadUrl) {
            var fd = new FormData();
            fd.append('menu', file);
           var resource = $resource(uploadUrl, {}, {
                'post': {method: 'POST', transformRequest: angular.identity, headers: {'Content-Type': undefined}}
            });
            resource.post(fd).$promise.then(function(data) {
                var promisedMenu = data.menu;
                console.log(promisedMenu);
                return promisedMenu;
            },
            function(data) {
            });

        }

    }]);