module.exports = function Gruntfile(grunt) {
    require('./config/grunt')(grunt);

    // Loads in each grunt task from its own file.
    [
        'concat', // Concatenates files together
        'connect', // Server task
        'copy', // File copying
        'eslint', // Javascript linting
        'jasmine', // Runs unit tests
        'ngtemplates', // Bundles angular partial html into javascript
        // Disabled SASS due to CSS being provided from outside.
        'sass', // Runs SASS transpilation
        'parallel',
        'express',
        'template', // Generates html templates.
        'watch' // Watches for file changes and runs tasks
    ].forEach(function forEachTask(taskName) {
        grunt.config.set(taskName, require('./grunt/' + taskName)(grunt));
    });

    // By default, grunt watches for file changes and bundles the code for distribution.
    grunt.registerTask('default', ['serve']);

    // Runs the server which serves the SPA into the localhost.
    // File changes restart the server.
    grunt.registerTask('serve', [
        //'connect:livereload', // The server
        //'watch:src' // The watch which checks for code changes and triggers the server reload
        'parallel:server'
    ]);

    // CSS
    grunt.registerTask('css', [
        'concat:sass',
        'sass:dist'
    ]);

    // This task concatenates all the javascript together, including the html templates.
    grunt.registerTask('bundle', [
        // Disabled superfluous CSS task.
        'css', // SASS transpiling
        'copy:font', // Twitter Bootstrap font copying
        //'template:index', // Index file copy
        //'concat:css', // CSS concatenation
        'concat:js', // Javascript concatenation
        'ngtemplates' // Angular partials to be included
    ]);

    // Watches for code changes and lists any issues
    grunt.registerTask('report', ['watch:report']);

    // Runs tests
    grunt.registerTask('test', [
        'jasmine:summary',
        // 'jasmine:app', // Commented due to unnecessary memory usage.
        'jasmine:coverage'
    ]);

    // Load task libraries
    require('load-grunt-tasks')(grunt, {
        // Without this, jasmine instanbul coverage generates an annoying error message.
        pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
    });
    require('time-grunt')(grunt);
};
