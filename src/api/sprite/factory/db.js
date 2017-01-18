// Capacitors
// Each capacitor includes a maximum, current and resistance.

// Also needs a Mongo schema.

var locationFactory = require('../../common/location/factory');
var contextService = require('../../context/service');

function SpriteAbility() {
    var data = {
        targets: [] // Tiles the ability can target.
    };

    function ability(scale, map, name) {
        if (scale !== undefined) {
            data.ability = contextService.find('ability', scale, map, name);
        }
        return data.ability;
    }

    function api() {
        return {
            ability: ability(),
            targets: []
        }
    }

    function model() {
        return ability().name;
    }

    this.ability = ability;
    this.model = model;
}

function Sprite(data) {

    // Will include a list of abilities and some attributes.
    function delta(name, value) {
        // An avenue of change happens to the sprite.
    }

    function location() {return data.location;}

    function abilities() {
        return data.abilities;
    }

    function api() {
        return {
            name: config().name,
            location: location().api(),
            abilities: abilities().map(function (spriteAbility) {
                return spriteAbility.api();
            }),
            player: player()
        };
    }

    function model() {
        return {
            name: config().name,
            location: location().model(),
            player: player()
        };
    }

    function config() {
        return data.config;
    }

    function player() {
        return data.player;
    }

    data.abilities = config().abilities().map(function (name) {
        var spriteAbility = new SpriteAbility();
        spriteAbility.ability(config().scale, config().map, name);
        return spriteAbility;
    });

    this.api = api;
    this.player = player;
    this.model = model;
}

function instantiate(location, context, name) {
    var config = contextService.find('sprite', context.scale, context.map, name);
    if (config === undefined) {
        throw new Error('sprite/factory/db: Sprite config not found for ' + [context.scale, context.map, name].join(', '));
    }
    return new Sprite({
        config: config,
        location: locationFactory(location)
    });
}

module.exports = instantiate;
