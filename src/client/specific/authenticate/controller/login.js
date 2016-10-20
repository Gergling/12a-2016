angular.module("authenticate").controller("authenticate.controller.login", [

    "$scope",
    "$state",
    "authenticate.service.login",
    "authenticate.service.core",

    function ($scope, $state, login, core) {
        "use strict";

        $scope.login = {
            username: "a@b.c",
            password: "abc"
        };

        // Checking if logged in
        core.user().then(function () {
            if (core.authenticated()) {
                $state.go(login.redirect());
            }
        });

        $scope.submit = function () {
            login.submit({
                username: $scope.login.username,
                password: $scope.login.password
            }).then(function (response) {
                // Todo: Seems to return with a 401 on success. Don't do that.
                if (login.redirect() === "container.login") {
                    $state.go("container.player.quests");
                } else {
                    $state.go(login.redirect());
                }
            }).catch(function (response) {
                console.error("login error", response);
            });
        };
    }
]);
