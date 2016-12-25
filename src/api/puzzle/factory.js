var q = require('q');
var mongoose = require('mongoose');

var Model = mongoose.model('Puzzle', require('./schema'));

function Puzzle() {
    // takes a context object
    // sprites
    // map
    function mission(value) {
        if (value !== undefined) {
            data.model.context = value;
        }
        return data.model.context;
    }

    function context() {
        return mission().context();
    }
}

function instantiate(mission) {
    var puzzle = new Puzzle();
    // puzzle is based on 
    puzzle.mission(mission);
    return puzzle;
}

module.exports = instantiate;
