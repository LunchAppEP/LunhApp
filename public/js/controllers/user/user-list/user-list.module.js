angular.module('newUserModule', [])
    .directive('newUser', function() {
        return {
            restrict: 'EA',
            templateUrl: 'js/controllers/user/user-list/user-list.template.html',
            controller: 'newUserCtrl',
            controllerAs: 'vm',
            replace: true,
            scope: {
                users: '=users'
            }

        }
    })
    .controller('newUserCtrl', ['$scope', 'userService', function($scope, userService) {
        var vm = this;
        vm.addMoney = function() {
            console.log(vm.userBalance);
            vm.newBalance = {
                id: vm.userBalance.id,
                balance: vm.userBalance.old + (vm.userBalance.balance || 0)
            };
            userService.changeBalance(vm.newBalance);
            users = userService.get();
            vm.userBalance = {};
        };
        $scope.$watch('users', function(oldVal, newVal){});
    }]);
