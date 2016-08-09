angular.module('menuAddController', [])

    .directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        }
    }])

    .controller('addController', ['$scope', 'Menu', function($scope, Menu) {
        var vm = this;
        vm.show = false;
        vm.uploadFile = function() {
            var menu = $scope.menu;
            var uploadUrl = '/uploads';
            vm.menu = Menu.send(menu, uploadUrl);
            console.log(vm.menu);
        }
}]);

