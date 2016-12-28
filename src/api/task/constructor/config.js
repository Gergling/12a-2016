//require('../../sprite/service/db');

function SpriteGenerator() {
    var data = {};

    function generate() {
        // create a new sprite
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
        generators.sprites = value.sprites.map(function (spriteData) {

            //spriteData.name
        });
    }

    this.initialise = initialise;
}

module.exports = TaskConfig;
