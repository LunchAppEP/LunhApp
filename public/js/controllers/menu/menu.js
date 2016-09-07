angular.module('menuAddController', [])
    
    .controller('addController', ['$scope', function($scope) {
        var vm = this;
        vm.menuStatus = false;
        vm.showWarning = false;
        $scope.$on('menuStatus', function (event, data) {
            vm.menuStatus = data;
            $scope.$broadcast('menuStatusSend', data);
        });

        $scope.$on('closePopup', function(event, data) {
            vm.showWarning = false;
        });

        $scope.$on('menuActions', function(event, data) {
            $scope.$broadcast('menuAction', data);
        });

        $scope.$on('showWarning', function(event, data) {
             vm.showWarning = data;
        });
        
}]);

