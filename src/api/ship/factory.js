var q = require('q');
var Model = require('mongoose').model('Ship', require('./schema'));

function Ship() {
    var data = {
        model: new Model({
            name: '(Unnamed ship)',
            roles: {}
        }),
        roles: {}
    };

    function name(value) {
        if (value !== undefined) {
            data.model.name = value;
        }
        return data.model.name;
    }

    function role(value, player) {
        if (player !== undefined) {
            data.roles[value] = player;
            model().roles[value] = player.model()._id;
        }
        return data.roles[value];
    }

    function model() {
        return data.model;
    }

    function save() {
        var deferred = q.defer();
        model().save(function (err, playerModel) {
            if (err) {
                deferred.reject('ship/factory: ' + err);
            } else {
                deferred.resolve(playerModel);
            }
        });
        return deferred.promise;
    }

    this.name = name;
    this.role = role;
    this.save = save;
    this.model = model;
}

function instantiate(obj) {
    var ship = new Ship();
    Object.keys(obj || {}).forEach(function (prop) {
        ship[prop](obj[prop]);
    });
    return ship;
}

module.exports = instantiate;
