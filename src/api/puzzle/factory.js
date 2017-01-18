var q = require('q');
var mongoose = require('mongoose');

var Model = mongoose.model('Puzzle', require('./schema'));

require('../task/model');

var spriteFactory = require('../sprite/factory/db');

function Puzzle() {
    var data = {};

    function initialise(task) {
        data.task = task;
        data.model = new Model({
            task: task.model()
        });
        console.log('puzzle/factory: sprite generators', task().generators('sprites'))

        // use the task generators for sprites at first, with whatever variables need to go in
        data.sprites = task().generators('sprites').map(function (generator) {
            console.log('puzzle/factory: generator', generator)
            return generator.generate();
        });
    }

    function load() {
        var deferred = q.defer();
        //Model.findOne({}, require('../util/deferred-callback')(deferred, 'puzzle/service: find'));
        Model.findOne({}, function (err, model) {
            var context;
            console.log('puzzle/factory: load', err, model, model.task)
            // clearly need to join in the task object from here
            // the task service needs a find function for the id in model.task
            if (err) {
                console.log(1)
                // Todo: Make this a standard format using a utility function.
                deferred.reject({
                    namespace: 'puzzle/factory: load',
                    error: err
                });
            } else {
                console.log(2)
                context = model.task.context;
                data.model = model;
                data.task = require('../context/service')
                    .find('task', context.scale, context.map, context.name);
                console.log('checking task', data.task)
                deferred.resolve(this);
            }
        }.bind(this)).populate('task');
        return deferred.promise;
    }

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
        //data.sprites = context.sprites
        // use task config sprite generators
        // run the generators, if the sprite created is in a location it shouldn't be, discard
        // task().generators()
    }

    function model() {
        // Update model here.
        // This is not really a good place to do that, but it will make sure the model is up to date.
        data.model.sprites = data.sprites.map(function (sprite) {
            console.log('puzzle/factory: sprite', sprite)
            return sprite.model();
        });
        return data.model;
    }

    function api() {
        return {
            scale: context().scale,
            map: context().map,
            sprites: data.sprites.map(function (sprite) {
                return sprite.api();
            }),
            tiles: data.tiles.map(function (tile) {
                return tile.api();
            })
        };
    }

    function save() {
        var deferred = q.defer();
        model().save(require('../util/deferred-callback')(deferred, 'puzzle/factory: save'));
        return deferred.promise;
    }

    this.task = task;
    this.save = save;
    this.model = model;
    this.initialise = initialise;
    this.load = load;
    this.api = api;
}

function instantiate(task) {
    var puzzle = new Puzzle();
    if (task !== undefined) {
        puzzle.initialise(task);
    }
    // puzzle is based on task configuration and generation.
    // generating sprite can only be done if the context and task are known
    // possibly these should all be done as one function or in the constructor arguments
    // since it will make no sense otherwise
    // context, task, generate sprite
    // neither a puzzle nor sprite can exist without a context and task
    return puzzle;
}

module.exports = instantiate;
