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
            Menu.send(menu).$promise.then(
                function(data) {
                    vm.menu = data.menu;
                    console.log(vm.menu);
                },
                function(data) {
                });
        }
        $scope.$watch('vm.menu', function(newVal, oldVal) {
            console.log('watch fired, new value: ' + newVal);
        })
}]);

