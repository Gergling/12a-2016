var q = require('q');
var mongoose = require('mongoose');

var schema = require('./schema');

var Model = mongoose.model('Player', schema);

function instantiate(obj) {
    return new Model(obj);
}

module.exports = {
    model: Player,
    instantiate: instantiate
};
