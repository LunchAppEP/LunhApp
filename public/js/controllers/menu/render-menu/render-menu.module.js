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

        vm.changeCurrentDay = function(index) {
            stateService.changeDayIndex(index);
        };

        $scope.config = {
            autoHideScrollbar: false,
            theme: 'light',
            advanced:{
                updateOnContentResize: true
            },
            setHeight: 200,
            scrollInertia: 0
        }

        $scope.$watch('$scope.menu', function(newVal) {
            newVal.forEach(function (item) {
                if (item.dishes.length != 0 || item.dinners.length != 0) {
                    vm.hideMenu = false;
                }
            });
        });

        $scope.$watch('vm.state.currentWeek', function(newVal) {
            vm.hideMenu = !$scope.menu.some(function(item) {
                return ((item.dishes.length != 0) || (item.dinners.length != 0));
            });
        });

        vm.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    }]);
