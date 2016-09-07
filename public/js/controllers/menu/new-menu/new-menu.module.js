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
        vm.wrongFile = false;

        vm.uploadFile = function (file) {
            vm.hasNewMenu = false;
            delete vm.menu;
            MenuService.send(file).$promise.then(
                function (data) {
                    vm.menu = {menu: data.menu, types: data.types, days: data.daysDates};
                    vm.wrongFile = false;
                    vm.hasNewMenu = true;
                    $scope.$emit('menuStatus', 'file');
                },
                function (data) {
                    vm.wrongFile = true;
                });
        };

        vm.saveMenu = function() {
            MenuService.save().$promise.then(function(data){
                $scope.$emit('menuStatus', 'saved');
            }, function(data){});

        };

        $scope.$watch('menuFileUpload', function(newVal) {
            if (newVal) {
                vm.uploadFile(newVal);
            }
        });
        
        $scope.$on('menuAction', function(event, data) {
            console.log(data);
            if (data == 'save') {
                MenuService.save().$promise.then(function(data){
                    $scope.$emit('menuStatus', 'saved');
                }, function(data){});
            } else if (data == 'delete') {
                vm.menu = false;
                vm.hasNewMenu = false;
                $scope.menuFileUpload = undefined;
                $scope.$emit('menuStatus', 'noFile');
            }
        });

        $scope.$watch('vm.menu', function(newVal) {});
        $scope.$watch("$scope.savedMenu.status", function(newVal) {});
    }])