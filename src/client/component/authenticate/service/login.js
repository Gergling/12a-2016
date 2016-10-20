angular.module("authenticate").service("authenticate.service.login", [

    "$q",
    "Restangular",
    "authenticate.service.core",

    function ($q, Restangular, core) {
        "use strict";

        var user = Restangular.all('user'),
            redirect = 'container.player.quests';

        this.redirect = function (value) {
            if (value) {redirect = value; }
            return redirect;
        };

        this.submit = function (params) {
            return $q.all([
                user.post(params),
                core.user()
            ]);
        }
    }
]);
