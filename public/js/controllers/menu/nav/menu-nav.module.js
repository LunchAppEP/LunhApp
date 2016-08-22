angular.module('navMenuModule', [])
    .directive('navMenu', function() {
        return {
            restrict: 'EA',
            templateUrl: 'js/controllers/menu/nav/menu-nav.template.html',
            controller: 'navMenuController',
            controllerAs: 'vm',
            replace: true,
            scope: {}
        }
    })
    .controller('navMenuController', ['$scope', 'stateService', function($scope, stateService) {
        var vm = this;
        vm.state = stateService;
        $scope.$watch('vm.state.currentWeek.type', function(newVal, oldVal) {
            if (newVal == 'last') {
                vm.hidePrev = true;
            } else if (newVal == 'next') {
                vm.hideNext  = true;
            };
        });

        vm.changeIndex = function(type) {
            stateService.changeWeekIndex(type);
            vm.hidePrev = false;
            vm.hideNext  = false;
            if (stateService.currentWeek.type == 'last') {
                vm.hidePrev = true;
            } else if (stateService.currentWeek.type == 'next') {
                vm.hideNext  = true;
            }
        };

    }]);

