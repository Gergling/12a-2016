// Require every ability config in the game.
var configs = [];

var configFactory = require('./factory/config');

require('glob')('quest/config/*/*/ability/*.js', {
    cwd: '../'
}, function (er, paths) {
    configs = paths.map(function (path) {
        var module = path.split('.')[0];
        var chunks = module.split('/');
        configFactory(chunks[2], chunks[3], chunks[5], require(path));
    });
});

function find(scale, map, name) {
    return configs.filter(function filter(config) {
        return config.scale() === scale && config.map() === map && config.name() === name;
    });
}

module.exports = {
    find: find
};
