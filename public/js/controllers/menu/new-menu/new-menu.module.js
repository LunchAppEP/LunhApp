angular.module('newMenuModule', [])

    .directive('newMenu', function() {
        return {
            restrict: 'EA',
            templateUrl: 'js/controllers/menu/new-menu/new-menu.template.html',
            controller: 'newMenuController',
            controllerAs: 'vm',
            replace: true,
            scope: {}
        }
    })

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

    .controller('newMenuController', ['$scope', 'stateService', 'MenuService', function($scope, stateService, MenuService) {
        var vm = this;
        vm.hasNewMenu = false;

        vm.uploadFile = function (file) {
            vm.hasNewMenu = false;
            delete vm.menu;
            MenuService.send(file).$promise.then(
                function (data) {
                    vm.menu = {menu: data.menu, types: data.types, days: data.daysDates};
                    vm.hasNewMenu = true;
                },
                function (data) {
                });
        };

        vm.saveMenu = function() {
            MenuService.save();
        };

        $scope.$watch('menuFileUpload', function(newVal) {
            if (newVal) {
                console.log(newVal);
                vm.uploadFile(newVal);
            }
        });

        $scope.$watch('vm.menu', function(newVal) {});
        $scope.$watch('$scope.savedMenu', function(newVal) {});

    }])