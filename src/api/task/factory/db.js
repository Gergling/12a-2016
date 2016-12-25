var q = require('q');
var mongoose = require('mongoose');

var Model = mongoose.model('Task', require('../schema'));

var contextService = require('../../context/service');

function Task() {
    var data = {
        model: new Model({
            name: 'Please stand by',
            description: [
                'This is not a mission.',
                'It might look like it is, but it is not.',
                'So do not go thinking this is a mission.',
                'Because it is not. Even though it looks like one.'
            ].join(' ')
        })
    };

    function description(value) {
        if (value !== undefined) {
            data.model.description = value;
        }
        return data.model.description;
    }

    function name(value) {
        if (value !== undefined) {
            data.model.name = value;
        }
        return data.model.name;
    }

    function context(value) {
        if (value !== undefined) {
            data.model.context = value;

            data.config = contextService.find('task', value.scale, value.map, value.name);
        }
        return data.model.context;
    }

    function model() {
        return data.model;
    }

    function role(value) {
        var roles = require('../../role/config');
        if (roles.indexOf(value) === -1) {
            throw new Error('mission/factory/db: ' + roles.join(', ') + '.');
        }
        return model().role = value;
    }

    function ship(value) {
        if (value !== undefined) {
            data.ship = value;
            model().ship = value.model()._id;
        }
        return data.ship;
    }

    function save() {
        var deferred = q.defer();
        model().save(function (err, missionModel) {
            if (err) {
                deferred.reject('mission/factory/db: ' + err);
            } else {
                deferred.resolve(missionModel);
            }
        });
        return deferred.promise;
    }

    this.model = model;
    this.save = save;
    this.name = name;
    this.description = description;
    this.ship = ship;
    this.role = role;
}

function instantiate(obj) {
    var mission = new Task();
    Object.keys(obj || {}).forEach(function (prop) {
        mission[prop](obj[prop]);
    });
    return mission;
}

module.exports = instantiate;
