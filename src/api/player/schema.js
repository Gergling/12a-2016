var Schema = require('mongoose').Schema;

module.exports = Schema({
    name: String,
    battle: {type: Schema.Types.ObjectId, ref: 'Battle'},
    ship: {type: Schema.Types.ObjectId, ref: 'Ship'}
});
