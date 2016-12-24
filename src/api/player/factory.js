var q = require('q');
var Model = require('mongoose').model('Player', require('./schema'));

function Player() {
    var data = new Model({
        name: '(Unnamed player)'
    });

    ['name', 'ship'].forEach(function (prop) {
        function getterSetter(value) {
            if (value !== undefined) {
                data[prop] = value;
            }
            return data[prop];
        }
        this[prop] = getterSetter;
    }.bind(this));

    // Todo: For some reason this is probably causing a hang.
    // Maybe the data doesn't match the spec.
    function model() {
        return data;
    }

    function save() {
        var deferred = q.defer();
        data.save(function (err, playerModel) {
            if (err) {
                deferred.reject('player/factory: ' + err);
            } else {
                deferred.resolve(playerModel);
            }
        });
        return deferred.promise;
    }

    this.save = save;
}

function instantiate(obj) {
    var player = new Player();
    Object.keys(obj || {}).forEach(function (prop) {
        player[prop](obj[prop]);
    });
    return player;
}

module.exports = instantiate;
