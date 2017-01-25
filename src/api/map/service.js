var locationFactory = require('../common/factory/location');

var data = {
    tiles: []
};

function tile(location) {
    var filtered = data.tiles.filter(function (tile) {
        return tile.location().x() === location.x() && tile.location().y() === location.y();
    });
    if (!filtered) {
        throw new Error('map/service: No tile at location (' + location.x() + ', ' + location.y() + ').');
    }
    return filtered[0];
}

module.exports = {
    tile: tile
};
