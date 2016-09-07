angular.module('userActionController', [])
    .controller('userController', ['$scope', 'userService', function($scope, userService) {
        var vm = this;
        vm.showPopup = false;
        vm.user = {};
        vm.addUser = false;
        vm.users = userService.get();

        vm.showPopup = function() {
            vm.addUser = true;
        };

        $scope.$on('closePopup', function(event, data) {
            vm.addUser = false;
        })

        vm.createUser = function() {
            userService.save(vm.user);
            vm.users = userService.get();
            vm.user = {};
        };
        $scope.$watch('vm.users', function(oldVal, newVal){});
    }]);