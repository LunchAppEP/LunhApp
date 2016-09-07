angular.module('renderMenuModule', [])
    .directive('renderMenu', function() {
        return {
            restrict: 'EA',
            templateUrl: 'js/controllers/menu/render-menu/render-menu.template.html',
            controller: 'renderMenuCtrl',
            controllerAs: 'vm',
            replace: true,
            scope: {
                menu: '=menu',
                types: '=types'
            }

        }
    })
    .controller('renderMenuCtrl', ['$scope', 'stateService', function($scope, stateService) {
        var vm = this;

        vm.state= stateService;
        vm.hideMenu = true;

        vm.changeCurrentDay = function(index) {
            stateService.changeDayIndex(index);
        };

        $scope.$watch('$scope.menu', function(newVal) {
            if (newVal) {
                newVal.forEach(function (item) {
                    if (item.dishes.length != 0 || item.dinners.length != 0) {
                        vm.hideMenu = false;
                    }
                });
            }
        });

        $scope.$watch('vm.state.currentWeek', function(newVal) {
            if ($scope.menu) {
                vm.hideMenu = !$scope.menu.some(function(item) {
                    return ((item.dishes.length != 0) || (item.dinners.length != 0));
                });
            }
        });

        vm.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    }]);
