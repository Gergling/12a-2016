// Capacitors
// Each capacitor includes a maximum, current and resistance.

// Also needs a Mongo schema.

var locationFactory = require('../common/factory/location');
var abilityService = require('../ability/service');

function SpriteAbility() {
    var data = {
        targets: [] // Tiles the ability can target.
    };

    function ability(value) {
        if (value !== undefined) {
            data.ability = value;
        }
        return data.ability;
    }

    this.ability = ability;
}

function Sprite() {
    var data = {
        location: locationFactory(),
        abilities: []
    };

    // Will include a list of abilities and some attributes.
    function delta(name, value) {
        // An avenue of change happens to the sprite.
    }

    function api() {
        return {
            name: data.name,
            location: data.location.api(),
            abilities: data.abilities.map(function (abilityName) {
                return abilityService('spaceship', 'interplanetary', abilityName).api();
            })
        }
    }

    this.api = api;
}

function instantiate() {
    return new Sprite();
}

module.exports = instantiate;
