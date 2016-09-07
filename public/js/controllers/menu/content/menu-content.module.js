angular.module('contentMenuModule', [])
    .directive('contentMenu', function() {
        return {
            restrict: 'EA',
            templateUrl: 'js/controllers/menu/content/menu-content.template.html',
            controller: 'contentMenuController',
            controllerAs: 'vm',
            replace: true,
            scope: {}
        }
    })
    
    .controller('contentMenuController', ['$scope', 'stateService', 'MenuService', 'getMenuService', function($scope, stateService, MenuService, getMenuService) {
        var vm = this;
        vm.state= stateService;
        vm.addMenu = false;
        vm.savedMenu = false;
        vm.menuService = getMenuService;
        vm.menuStatus = false;

        $scope.$on('menuStatus', function (event, data) {
            vm.menuStatus = data;
            if (vm.menuStatus == 'saved') {
                vm.savedMenu = true;
                vm.menuService.updateMenu();
                vm.menu = vm.menuService.menu.thisWeekMenu(vm.state.currentWeek.period);
                vm.types = vm.menuService.menu.types;
            }
        });

        $scope.$watch('vm.menuService.menu.dishes', function(newVal) {
            if (newVal) {
                vm.menu = vm.menuService.menu.thisWeekMenu(vm.state.currentWeek.period);
                vm.types = vm.menuService.menu.types;
            }
        });

        $scope.$watch('vm.state.currentWeek', function(newVal) {
            if (newVal) {
                vm.addMenu = newVal.type == 'next';

                if (Array.isArray(newVal.period)) {
                    vm.menu = vm.menuService.menu.thisWeekMenu(newVal.period);
                    vm.types = vm.menuService.menu.types;
                }
                if (vm.menu && vm.addMenu) {
                    vm.savedMenu = true;
                }
            }
        });

    }]);
