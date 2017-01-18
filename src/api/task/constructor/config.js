var spriteFactory = require('../../sprite/factory/db');

function SpriteGenerator(data, taskConfig) {
    function generate(location) {
        // Also need to pass in other behavioural factors.
        // E.g. pirate sprites will board, destroyer bots will destroy, and mysteries will spawn different sprites on
        // death.
        return spriteFactory(location || data.location, taskConfig, data.name);
    }

    this.generate = generate;
}

function TileGenerator(data, taskConfig) {
    function generate(location) {
        return tileFactory(location, taskConfig, data.name);
    }
}

function TaskConfig() {
    // Terrain should be generated according to player sprite visibility.
    // Sprites should be generated... somehow.
    var generator = {};

    function initialise(value) {
        var success = true;
        if (typeof value.tiles === 'string') {

        }
        if (value.sprites !== undefined) {
            if (value.sprites.constructor === [].constructor) {
                generator.sprites = value.sprites.map(function (spriteData) {
                    // return a sprite generator
                    return new SpriteGenerator(spriteData, this);
                }.bind(this));
            } else {
                throw new Error([
                    'task/constructor/config: Task configuration failure, \'sprites\' property is not an array.'
                ].join(''));
            }
        } else {
            generator.sprites = [];
        }
        return success;
    }

    function generators(prop) {
        return generator[prop];
    }

    this.initialise = initialise;
    this.generators = generators;
}

module.exports = TaskConfig;
