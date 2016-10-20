angular.module("player").service("playerServiceAPI",
function ($http) {
    this.create = function (player) {
        return $http.post('/player', player);
    };
    this.edit = function (player) {
        return $http.post('/player', player);
    };

    this.all = function () {
        return $http.get('/player');
    };
});