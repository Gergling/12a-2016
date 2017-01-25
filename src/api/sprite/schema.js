// Sprite schema.
module.exports = require('mongoose').Schema({
    name: String,
    location: {type: Number, ref: require('../common/location/schema')}
    // Will also store capacitors.
});
