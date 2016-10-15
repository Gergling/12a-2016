module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-angular-templates');

    return {
        application: {
            src: ['*/**/*.html'],
            cwd: 'src/client/',
            dest: grunt.config.get('dist') + '/concat.js',
            options: {
                append: true                
            }
        }
    };
};
