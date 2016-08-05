angular.module('addMenuService', [])

    // super simple service
    // each function returns a promise object
    .factory('Menu', ['$http', function($http) {
        return {
            'post': uploadFileToUrl
        }
        function uploadFileToUrl(file, uploadUrl) {
            console.log(file);
            var fd = new FormData();
            fd.append('menu', file);
            console.log(fd);
            $http({
                    method: 'POST',
                    url: uploadUrl,
                    data: {fd},
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
        }

    }]);