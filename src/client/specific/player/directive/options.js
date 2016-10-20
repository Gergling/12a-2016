angular.module("player").directive("playerOptions", function () {
    return {
        templateUrl: "component/player/partial/directive-options.html",
        controller: function ($scope, authenticateServiceCore, playerServiceAPI, playerServiceChosen) {
            $scope.user = "Guest";
            $scope.player = {
                chosen: { name: "(No Character Selected)" },
                list: [ ],
                select: function (character) {
                    this.chosen = character;
                    playerServiceChosen(character);
                }
            };

            authenticateServiceCore.user().then(function (user) {
                $scope.user = user.username;
            });

            playerServiceAPI.all().then(function (list) {
                $scope.player.list = list;
            });
        }
    };
});
