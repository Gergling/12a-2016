angular.module('battle').service('battleServiceManager', function (commonIsometricServiceTiles, battleServiceAPI) {
    function fetch() {
        return battleServiceAPI.get().then(function (response) {
            response.map.tiles.forEach(function (tile) {
                commonIsometricServiceTiles.tiles()
            });
        });
    }

    return {
        fetch: fetch
    };
});
