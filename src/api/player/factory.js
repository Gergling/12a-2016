var q = require('q');
var Model = require('mongoose').model('Player', require('./schema'));

function Player() {
    var data = {
        model: new Model({
            name: '(Unnamed player)'
        })
    };

    function name(value) {
        if (value !== undefined) {
            data.model.name = value;
        }
        return data.model.name;
    }

    function ship(value) {
        if (value !== undefined) {
            data.ship = value;
            data.model.ship = data.ship.model()._id;
        }
        return data.ship;
    }


    // Todo: For some reason this is probably causing a hang.
    // Maybe the data doesn't match the spec.
    function model() {
        return data.model;
    }

    function save() {
        var deferred = q.defer();
        model().save(function (err, playerModel) {
            if (err) {
                deferred.reject('player/factory: ' + err);
            } else {
                deferred.resolve(playerModel);
            }
        });
        return deferred.promise;
    }

    this.save = save;
    this.name = name;
    this.ship = ship;
}

function instantiate(obj) {
    var player = new Player();
    Object.keys(obj || {}).forEach(function (prop) {
        player[prop](obj[prop]);
    });
    return player;
}

module.exports = instantiate;
