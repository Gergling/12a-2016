var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemas = {
    // location: {
    //     type: Schema.Types.ObjectId, ref: 'Ship'
    // }
    location: require('../common/location/schema')
};

module.exports = mongoose.Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    sprites: [
        {
            name: String,
            location: schemas.location,
            abilities: [
                {
                    name: String,
                    tiles: [schemas.location]
                }
            ]
        }
    ],
    map: [
        {
            name: String,
            location: schemas.location
        }
    ]
    // Map schema. This will have all the tiles.
    // Context schema. This will have the scale/map.
});
