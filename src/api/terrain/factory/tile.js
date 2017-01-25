var locationFactory = require('../../common/location/factory');

var contextService = require('../../context/service');

function Tile(context, name) {
    var data = {
        sprite: undefined
    };

    Object.keys(data).forEach(function (key) {
        this[key] = function getterSetter(value) {
            if (value !== undefined) {
                data[key] = value;
            }
            return data[key];
        };
    }.bind(this));

    function location() {
        return data.location;
    }

    function model() {
        return {
            location: data.location.model(),
            name: name
        }
    }

    function api() {
        return {
            location: data.location.api(),
            name: name
        }
    }

    data.location = locationFactory();

    data.config = contextService.find('terrain', context.scale, context.map, name);

    this.location = location;
    this.model = model;
    this.api = api;
}

function instantiate(location, context, name) {
    var tile = new Tile(context, name);
    tile.location().set(location);
    return tile;
}

module.exports = instantiate;
