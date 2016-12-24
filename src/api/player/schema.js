module.exports = require('mongoose').Schema({
    name: String,
    battle: {type: Number, ref: require('../battle/schema')}
});
