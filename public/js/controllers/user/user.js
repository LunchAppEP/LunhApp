angular.module('userActionController', [])
    .controller('userController', ['$scope', 'userService', function($scope, userService) {
        var vm = this;
        vm.showPopup = false;
        vm.addBal = false;
        vm.user = {};
        vm.userBalance = {};
        vm.users = userService.get();
        vm.createUser = function() {
            userService.save(vm.user);
            vm.users = userService.get();
            vm.user = {};
        };
        $scope.$watch('vm.users', function(oldVal, newVal){});
        vm.addMoney = function() {
            console.log(vm.userBalance);
            vm.newBalance = {
                id: vm.userBalance.id,
                balance: vm.userBalance.old + (vm.userBalance.balance || 0)
            };
            userService.changeBalance(vm.newBalance);
            vm.users = userService.get();
            vm.userBalance = {};
        };
        vm.updateInfo = function() {

        }
    }]);