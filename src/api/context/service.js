var q = require('q');

var configs = [];

var contextProps = [
    'scale',
    'map',
    'name'
];

function schema() {
    var obj = {};
    contextProps.forEach(function (prop) {
        obj[prop] = String;
    });
    return obj;
}

function loadEntity(entityName) {
    var deferred = q.defer();
    var ConfigConstructor = require('../' + entityName + '/constructor/config');
    require('glob')(entityName + '/config/*/*/*.js', {
        cwd: 'src/api/'
    }, function (er, paths) {
        var rejection = false;
        configs = configs.concat(paths.map(function (path) {
            var config = new ConfigConstructor();
            var moduleName = path.split('.')[0];
            var chunks = moduleName.split('/');
            config.entity = chunks[0];
            config.scale = chunks[2];
            config.map = chunks[3];
            config.name = chunks[4];
            if (typeof config.initialise !== 'function') {
                rejection = true;
            } else {
                config.initialise(require('../' + moduleName));
            }
            return config;
        }).filter(function (config) {
            return config;
        }));
        if (rejection) {
            deferred.reject([
                entityName,
                'constructor requires initialise function which takes the raw config data.'
            ].join(' '));
        } else {
            deferred.resolve(configs);
        }
    });
    return deferred.promise;
}

function load() {
    return q.all([
        'ability',
        'sprite',
        'task',
        'terrain'
    ].map(loadEntity));
}

function find(entity, scale, map, name) {
    var item = configs.filter(function filter(config) {
        return config.entity === entity && config.scale === scale && config.map === map && config.name === name;
    }).map(function (config) {
        return config;
    })[0];

    // If the item doesn't exist, look in the common map type.
    if (item === undefined && map !== 'common') {
        item = find(entity, scale, 'common', name);
    }
    return item;
}

function instantiate(context, cls, data) {
    var config = new cls(data);
    Object.keys(obj).forEach(function (property) {
        config[property](obj[property]);
    });
    return config;
}

module.exports = {
    find: find,
    load: load
};
