// Checks whether configurations are valid.
module.exports = function (grunt) {
    // Check for content in each scale/map comination.
    var report = {};
    var quest = [];

    // Load skills to check if requested skills exist.
    require('../src/api/skill/tree');

    // Check quest configurations.
    grunt.file.expand('src/api/quest/config/*/*/*.js').forEach(function (path) {
        var chunks = path.split('/');
        var scale = chunks[4];
        var map = chunks[5];
        var name = chunks[6].split('.').shift();

        if (!report[scale]) {report[scale] = {};}
        if (!report[scale][map]) {
            report[scale][map] = {
                quests: [],
                sprite: [],
                ability: [],
                terrain: []
            };
        }

        report[scale][map].quests.push(name);

        [
            'sprite',
            'ability',
            'terrain'
        ].forEach(function (module) {
            report[scale][map][module] = grunt.file.expand([
                'src/api',
                module,
                'config',
                scale,
                map,
                '*.js'
            ].join('/')).map(function (path2) {
                return path2.split('/')[6].split('.').shift();
            });
        });
    });

    return {
        report: report
    };
};
