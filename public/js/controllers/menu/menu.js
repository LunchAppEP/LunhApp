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

    .controller('addController', ['$scope', 'MenuService', function($scope, MenuService) {
        var vm = this;
        vm.show = false;
        vm.days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
        vm.uploadFile = function() {
            var menuFile = $scope.menuFileUpload;
            MenuService.send(menuFile).$promise.then(
                function(data) {
                    vm.menu = {menu: data.menu, types: data.types, days: data.daysDates};
                },
                function(data) {});
        };
        $scope.$watch('vm.menu', function(newVal, oldVal) {});
}]);

