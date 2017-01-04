var q = require('q');
var mongoose = require('mongoose');

var Model = mongoose.model('Puzzle', require('./schema'));

var spriteFactory = require('../sprite/factory/db');

function Puzzle(data) {
    // takes a context object
    // sprites
    // map

    data.model = new Model({
        task: data.task.model()
    });

    function task() {
        return data.task;
    }

    function model() {
        // create a model
    }

    function context() {
        return task().context();
    }

    function createSprites() {
        //spriteFactory
        data.sprites = context.sprites
    }

    function model() {
        // Update model here.
        // This is not really a good place to do that, but it will make sure the model is up to date.
        data.model.sprites = data.sprites.map(function (sprite) {
            return sprite.model();
        });
        return data.model;
    }

    function save() {
        var deferred = q.defer();
        model().save(require('../util/deferred-callback')(deferred, 'puzzle/factory'));
        return deferred.promise;
    }

    data.sprites = task().generators('sprites').map(function (generator) {
        console.log(generator)
        generator.generate();
    });

    this.task = task;
    this.save = save;
}

function instantiate(task) {
    var puzzle = new Puzzle({
        task: task
    });
    // puzzle is based on task configuration and generation.
    // generating sprite can only be done if the context and task are known
    // possibly these should all be done as one function or in the constructor arguments
    // since it will make no sense otherwise
    // context, task, generate sprite
    // neither a puzzle nor sprite can exist without a context and task
    return puzzle;
}

module.exports = instantiate;
