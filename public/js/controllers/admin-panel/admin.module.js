angular.module('adminPanelModule', [])

    .directive('adminPanel', function() {
        return {
            restrict: 'EA',
            templateUrl: 'js/controllers/admin-panel/admin.template.html',
            controller: 'adminPanelController',
            controllerAs: 'vm',
            replace: true,
            scope: {}
        }
    })

    .controller('adminPanelController', ['$scope', 'stateService', 'MenuService', function($scope, stateService, MenuService) {
        
    }])
