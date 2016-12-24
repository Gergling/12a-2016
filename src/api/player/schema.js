var Schema = require('mongoose').Schema;

module.exports = Schema({
    name: String,
    battle: {type: Schema.Types.ObjectId, ref: require('../battle/schema')},
    ship: {type: Schema.Types.ObjectId, ref: 'Ship'}
});
