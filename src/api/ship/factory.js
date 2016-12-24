var q = require('q');
var Model = require('mongoose').model('Ship', require('./schema'));

function Ship() {
    var data = new Model({
        name: '(Unnamed ship)',
        //roles: {}
    });

    function name(value) {
        if (value !== undefined) {
            data.name = value;
        }
        return data.name;
    }

    // function roles(role, player) {
    //     data.roles[role] = player;
    // }

    function model() {
        return data;
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
    //this.roles = roles;
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
