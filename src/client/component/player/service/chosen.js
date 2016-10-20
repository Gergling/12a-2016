angular.module("player").factory("playerServiceChosen", function () {
    var player;
    return function (value) {
        if (value) {
            player = value;
            // Cookify.
        }
        return player;
    };
});
