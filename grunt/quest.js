// Checks whether configurations are valid.
module.exports = function (grunt) {
    // Check for content in each scale/map comination.
    var report = {};
    var quest = [];

    // Load skills to check if requested skills exist.
    require('../src/api/skill/tree');

    // Check quest configurations.
    var modules = [
        'quest',
        'sprite',
        'ability',
        'terrain'
    ];
    modules.forEach(function (module) {
        grunt.file.expand('src/api/' + module + '/config/*/*/*.js').forEach(function (path) {
            var chunks = path.split('/');
            var scale = chunks[4];
            var map = chunks[5];
            var name = chunks[6].split('.').shift();

            if (!report[scale]) {report[scale] = {};}
            if (!report[scale][map]) {
                report[scale][map] = {};
                modules.forEach(function (mod) {
                    report[scale][map][mod] = [];
                });
            }

            report[scale][map][module].push(name);
        });
    });

    return {
        report: report
    };
};
