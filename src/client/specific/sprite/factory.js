angular.module('sprite').factory('spriteFactory', function () {
    function Sprite() {
        
    }
    function instantiate() {
        return new Sprite();
    }
    return instantiate;
});
