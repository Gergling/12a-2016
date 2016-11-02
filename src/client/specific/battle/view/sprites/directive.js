angular.module('battle').directive('battleSprites', function () {
    return {
        templateUrl: 'specific/battle/view/sprites/partial.html',
        controllerAs: 'battleControllerSprites',
        controller: 'battleControllerSprites'
    };
});
