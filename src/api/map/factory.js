var locationFactory = require('../common/location/factory');

var tileFactory = require('../terrain/factory/tile');

function Map(context) {
    var data = {
        tiles: []
    };

    function findTile(x, y) {
        return tiles().filter(function filter(tile) {
            return tile.location().x() === x && tile.location().y() === y;
        })[0];
    }

    function model() {
        return data.tiles.map(function (tile) {
            return tile.model();
        });
    }

    function api() {
        return data.tiles.map(function (tile) {
            return tile.api();
        });
    }

    function set(value) {
        data.tiles = value.tiles.map(function (tile) {
            return tileFactory(
                locationFactory(tile.location),
                context,
                tile.name
            );
        });
        return this;
    }

    function generate(value) {
        var x = 0;
        var y = 0;

        value.size = value.size || 1;
        value.width = value.width || value.size;
        value.length = value.length || value.size;

        for (y = 0; y < value.length; y += 1) {
            for (x = 0; x < value.width; x += 1) {
                var tile = findTile(x, y);
                if (tile === undefined) {
                    tile = tileFactory(
                        locationFactory(x, y),
                        context,
                        'empty'
                    );
                }
                data.tiles.push(tile);
            }
        }
        return this;
    }

    function tiles() {
        return data.tiles;
    }

    this.model = model;
    this.tiles = tiles;
    this.generate = generate;
    this.set = set;
    this.api = api;
}

function instantiate(value, context) {
    var map = new Map(context);
    if (typeof context !== 'object') {
        throw new Error('map/factory.instantiate: Context not defined.');
    }
    if (value !== undefined) {
        if (value.tiles && value.tiles.length) {
            map.set(value);
        } else {
            map.generate(value);
        }
    }
    return map;
}

module.exports = instantiate;
