var mongoose = require('mongoose');

var schemas = {
    location: require('../common/location/schema')
};

module.exports = mongoose.Schema({
    task: require('../task/schema'),
    //sprites: [require('../sprite/schema')], // Get the sprite schema
    // Make into an actual schema.
    // Work out exactly what this is and where it should be after you've got a working example.
    sprites: [
        {
            name: String,
            location: {type: Number, ref: schemas.location},
            abilities: [
                {
                    name: String,
                    tiles: [{type: Number, ref: schemas.location}]
                }
            ]
        }
    ]
    // Map schema. This will have all the tiles.
    // Context schema. This will have the scale/map.
});
