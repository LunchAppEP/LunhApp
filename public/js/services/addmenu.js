angular.module('addMenuService', [])

    // super simple service
    // each function returns a promise object
    .service('Menu', ['$http', function($http) {
        return {
            'post': uploadFileToUrl
        }
        function uploadFileToUrl(file, uploadUrl) {
            debugger;
            console.log(file);
            var fd = new FormData();
            fd.append('file', file);
            console.log(fd);
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function(){

                })
                .error(function(){
                });
        }

    }]);