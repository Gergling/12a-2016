angular.module('battle').service('battleServiceManager', function (commonIsometricServiceTiles, battleServiceAPI) {
    function fetch() {
        return battleServiceAPI.get().then(function (response) {
            response.tiles.forEach(function (tile) {
                commonIsometricServiceTiles.tile(tile.location.x, 0, tile.location.y);
            });
        });
    }

    return {
        fetch: fetch
    };
});
