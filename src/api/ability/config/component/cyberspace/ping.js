// You ping a tile, so you select the ability and need to select a tile.
// It needs a list of skills and weights assigned to it.

module.exports = {
    range: 1,
    target: {
        // a single tile
        type: 'tile',

    },
    skills: {
        'science.technology.engineering.cyberspace': 1,
        'science.model.technology.cyberspace': 1
    },
    response: {
        // I don't know what effect this should have, if any.
    }
};
