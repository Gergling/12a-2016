angular.module('battle').service('battleServiceManager', function (
    commonIsometricServiceTiles,
    battleServiceAPI,
    spriteFactory,
    spriteService
) {
    // Fetch battle state and load into various registers.
    function fetch() {
        return battleServiceAPI.get().then(function (response) {
            console.log(response)
            response.tiles.forEach(function (tile) {
                commonIsometricServiceTiles.tile(tile.location.x, 0, tile.location.y);
            });
            spriteService.list(response.sprites.map(function (spriteData) {
                return spriteFactory(
                    spriteData.name,
                    spriteData.abilities,
                    spriteData.location,
                    response.scale,
                    response.name
                );
            }));
        });
    }

    return {
        fetch: fetch
    };
});
