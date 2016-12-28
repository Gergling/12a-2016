var spriteFactory = require('../../sprite/factory/db');

function SpriteGenerator(data, taskConfig) {
    function generate() {
        return spriteFactory(data.location, taskConfig, data.name);
    }
}

function TaskConfig() {
    // Terrain should be generated according to player sprite visibility.
    // Sprites should be generated... somehow.
    var generators = {
    };

    function initialise(value) {
        if (typeof value.tiles === 'string') {

        }
        if (value.sprites !== undefined) {
            if (value.sprites.constructor === [].constructor) {
                generators.sprites = value.sprites.map(function (spriteData) {
                    // return a sprite generator
                    return new SpriteGenerator(spriteData, this);
                }.bind(this));
            } else {
                throw new Error([
                    'task/constructor/config: Task configuration failure, \'sprites\' property is not an array.'
                ].join(''));
            }
        }

    }

    this.initialise = initialise;
}

module.exports = TaskConfig;
