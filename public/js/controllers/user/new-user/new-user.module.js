angular.module('addUserModule', [])
    .directive('addUserPopup', function() {
        return {
            restrict: 'EA',
            templateUrl: 'js/controllers/user/new-user/new-user.template.html',
            controller: 'addUserPopupController',
            controllerAs: 'vm',
            replace: true,
            scope: {}
        }
    })

    .controller('addUserPopupController', ['$scope', function($scope) {
        var vm = this;
        vm.closePopup = function() {
            $scope.$emit('closePopup', true);
        };

        vm.menuActions = function(action) {
            $scope.$emit('menuActions', action);
            $scope.$emit('closePopup', true);
        };
    }]);