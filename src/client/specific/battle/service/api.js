angular.module("battle").service("battleServiceAPI", function ($http) {
    function get() {
        return $http.get('/battle').then(function (response) {
            return response.data;
        });
    };

    function post(casterTile, abilityName, targetTile) {
        return $http.post('/battle', {
            name: abilityName,
            location: {
                x: casterTile.location().x(),
                y: casterTile.location().z()
            },
            target: {
                x: targetTile.location().x(),
                y: targetTile.location().z()
            }
        }).then(function (response) {
            return response.data;
        });        
    }

    return {
        get: get,
        post: post
    };
});
