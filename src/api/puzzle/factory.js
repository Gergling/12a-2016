var q = require('q');
var mongoose = require('mongoose');

var Model = mongoose.model('Puzzle', require('./schema'));

require('../task/model');

var spriteFactory = require('../sprite/factory/db');

var locationFactory = require('../common/location/factory');

var mapFactory = require('../map/factory');

var contextService = require('../context/service');

function Puzzle() {
    var data = {};

    function initialise(value) {
        data.task = value;
        data.model = new Model({
            task: value.model()
        });

        data.sprites = task().generators('sprites').map(function (generator) {
            return generator.generate();
        });

        data.map = mapFactory({size: 4}, value.context());
    }

    function load() {
        var deferred = q.defer();
        Model.findOne({}, function (err, model) {
            var context;
            if (err) {
                deferred.reject({
                    namespace: 'puzzle/factory: load',
                    error: err
                });
            } else {
                context = model.task.context;
                data.model = model;
                data.task = contextService.find(
                    'task',
                    context.scale,
                    context.map,
                    context.name
                );
                data.sprites = model.sprites.map(function (spriteData) {
                    return spriteFactory(
                        locationFactory(spriteData.location),
                        context,
                        spriteData.name
                    );
                });
                data.map = mapFactory({tiles: model.map}, context);

                deferred.resolve(this);
            }
        }.bind(this)).populate('task');
        return deferred.promise;
    }

    function task() {
        return data.task;
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
            return sprite.model();
        });
        data.model.map = data.map.model();
        return data.model;
    }

    function api() {
        return {
            scale: task().scale,
            map: task().map,
            sprites: data.sprites.map(function (sprite) {
                return sprite.api();
            }),
            tiles: data.map.api()
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
