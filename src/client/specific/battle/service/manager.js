angular.module('battle').service('battleServiceManager', function (
    commonIsometricServiceTiles,
    battleServiceAPI,
    spriteFactory
) {
    // Sprites being used in the current battle.
    var sprites = [];

    // Fetch battle state and load into various registers.
    function fetch() {
        return battleServiceAPI.get().then(function (response) {
            console.log(response)
            response.tiles.forEach(function (tile) {
                commonIsometricServiceTiles.tile(tile.location.x, 0, tile.location.y);
            });
            sprites = response.sprites.map(spriteFactory);
        });
    }

    return {
        fetch: fetch
    };
});
