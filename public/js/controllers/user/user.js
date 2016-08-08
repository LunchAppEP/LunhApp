angular.module('userActionController', [])
    .controller('userActionCtrl', function($scope, $http) {
        var vm = this;
        vm.showPopup = false;
        vm.users = User.get();

    });