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
        vm.getMenu = getMenuService;
        
        $scope.$watch('vm.state.currentWeek', function(newVal) {
            vm.addMenu = newVal.type == 'next';
            vm.menu = vm.getMenu.allItems.thisWeekMenu(newVal.period);
        });
        $scope.$watch('vm.getMenu.allItems', function(newVal) {
            vm.menu = newVal.thisWeekMenu(vm.state.currentWeek.period);
        });

    }]);
