angular.module('battle').directive('battlePanel', function () {
    return {
        templateUrl: 'specific/battle/view/panel/partial.html',
        controllerAs: 'battleControllerPanel',
        controller: 'battleControllerPanel'
    };
});
