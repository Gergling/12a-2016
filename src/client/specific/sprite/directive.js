angular.module('sprite').directive('sprite', function () {
    return {
        scope: {sprite: '='},
        templateUrl: 'specific/sprite/partial.html',
        controllerAs: 'spriteController',
        controller: 'spriteController',
        bindToController: true,
    }
});
