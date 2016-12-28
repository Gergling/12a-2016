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

function ConfigContext() {
    var data = {};

    function assignGetterSetter(name) {
        this[name] = function getterSetter(value) {
            if (value !== undefined) {
                data[name] = value;
            }
            return data[name];
        }
    }

    // Assign getter/setters based on properties.
    contextProps.forEach(assignGetterSetter.bind(this));
}

function loadEntity(entityName) {
    var deferred = q.defer();
    var ConfigConstructor = require('../' + entityName + '/constructor/config');
    ConfigConstructor.prototype = new ConfigContext;
    require('glob')('' + entityName + '/config/*/*/*.js', {
        cwd: 'src/api/'
    }, function (er, paths) {
        configs = configs.concat(paths.map(function (path) {
            var config = new ConfigConstructor;
            var moduleName = path.split('.')[0];
            var chunks = moduleName.split('/');
            config.scale(chunks[4]);
            config.map(chunks[5]);
            config.name(chunks[6]);
            if (typeof config.initialise !== 'function') {
                throw new Error([
                    entityName,
                    'constructor requires initialise function which takes the raw config data.'
                ].join(' '));
                // needs to be a rejection
            } else {
                config.initialise(require('../' + moduleName));
            }
            return config;
        }));
        deferred.resolve(configs);
    });
    return deferred.promise;
}

function load() {
    return q.all([
        //'ability',
        //'sprite',
        'task'
    ].map(loadEntity));
}

function find(entity, scale, map, name) {
    return configs.filter(function filter(config) {
        return config.scale() === scale && config.map() === map && config.name() === name;
    });
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
