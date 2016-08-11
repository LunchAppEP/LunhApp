angular.module('userActionController', [])
    .controller('userController', ['$scope', 'userService', function($scope, userService) {
        var vm = this;
        vm.showPopup = false;
        vm.user = {};
        vm.users = userService.get();
        vm.createUser = function() {
            userService.save(vm.user);
            vm.users = userService.get();
        }

        $scope.$watch('vm.users', function(oldVal, newVal){});
    }]);