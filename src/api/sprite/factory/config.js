// should be a constructor

// Capacitors
// Each capacitor includes a maximum, current and resistance.

// Also needs a Mongo schema.

//var locationFactory = require('../common/factory/location');
var abilityService = require('../ability/service');
//var spriteServiceConfig = require('../service/config');

function SpriteConfig() {
    var data = {
        abilities: []
    };

    // Will include a list of abilities and some attributes.
    function delta(name, value) {
        // An avenue of change happens to the sprite.
    }

    function abilities(value) {
        // if (value !== undefined) {
        //     data.abilities = value;
        // }
        return data.abilities;
    }

    function initialise(configData) {
        data.abilities = configData.abilities.map(function (abilityName) {
            return abilityService(this.scale, this.map, abilityName);
        }.bind(this));
    }

    function api() {
        return {
            name: data.name,
            location: data.location.api(),
            abilities: data.abilities.map(function (ability) {
                return ability.api();
            })
        }
    }

    this.api = api;
}

module.exports = SpriteConfig;
