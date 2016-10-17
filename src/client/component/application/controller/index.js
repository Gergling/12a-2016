angular.module('application').controller("applicationControllerIndex", function ($scope, applicationServiceNavigation) {
    $scope.navigation = applicationServiceNavigation;
});
