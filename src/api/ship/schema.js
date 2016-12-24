var Schema = require('mongoose').Schema;

var obj = {};
require('../role/config').forEach(function (prop) {
    obj[prop] = player();
});

function player() {return {type: Schema.Types.ObjectId, ref: 'Player'};}

module.exports = Schema({
    name: String,
    roles: obj
});
