angular.module("battle").service("battleServiceAPI", function ($http) {
    function get() {
        return $http.get('/battle').then(function (response) {
            return response.data;
        });
    };

    return {
        get: get
    };
});
