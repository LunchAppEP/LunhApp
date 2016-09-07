angular.module('warningPopupModule', [])
    .directive('warningPopup', function() {
        return {
            restrict: 'EA',
            templateUrl: 'js/controllers/menu/warning/warningPopup.template.html',
            controller: 'warningPopupController',
            controllerAs: 'vm',
            replace: true,
            scope: {}
        }
    })

    .controller('warningPopupController', ['$scope', function($scope) {
        var vm = this;
        vm.closePopup = function() {
            $scope.$emit('closePopup', true);
        };

        vm.menuActions = function(action) {
            $scope.$emit('menuActions', action);
            $scope.$emit('closePopup', true);
        };
    }]);