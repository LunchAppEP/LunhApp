angular.module('addMenuService', [])

    // super simple service
    // each function returns a promise object
    .factory('Menu', ['$http', function($http) {
        return {
            'post': uploadFileToUrl
        }
        function uploadFileToUrl(file, uploadUrl) {
            var fd = new FormData();
            fd.append('menu', file);
            $http({
                    method: 'POST',
                    url: uploadUrl,
                    data: fd,
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
           // return $resource(uploadUrl, {fd}, {
           //      'post': {method: 'POST', transformRequest: angular.identity, headers: {'Content-Type': undefined}}
           //  })
        }

    }]);