// Require every ability config in the game.
var configs = [];

var configFactory = require('./factory/config');

require('glob')('quest/config/*/*/ability/*.js', {
    cwd: '../'
}, function (er, paths) {
    configs.push(configFactory(paths.forEach(require)));
});

function find(scale, map, name) {
    return configs.filter(function filter(config) {
        return config.scale() === scale && config.map() === map && config.name() === name;
    });
}

module.exports = {
    find: find
};
