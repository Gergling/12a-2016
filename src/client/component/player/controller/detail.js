angular.module("player").controller("player.controller.detail", [

    "$scope",
    "$state",

    "player.service.api",
    "player.service.chosen",

    function ($scope, $state, api, player) {
        if ($state.current.name === "container.player-create") {
            $scope.player = player({});
        } else {
            $scope.player = player();
        }

        $scope.submit = function () {
            api.edit($scope.player).then(function () {
                // Redirect to quest list
                $state.go("container.player.quests");
            });
        };
    }
]);