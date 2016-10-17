module.exports = function concat(grunt) {
    return {
        options: {
            separator: ';\n'
        },
        js: {
            src: [
                'node_modules/angular/angular.js',
                'node_modules/jquery/dist/jquery.js',
                'node_modules/bootstrap/dist/js/bootstrap.js',
                'node_modules/angular-ui-router/release/angular-ui-router.js',
                'node_modules/angular-animate/angular-animate.js',
                'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',

                'src/client/*/*/module.js',
                'src/client/**/*.js'
            ],
            dest: grunt.config.get('dist') + '/concat.js',
            banner: "'use strict';\n",
            footer: 'window.angular = angular;'
        },
        css: {
            src: [
                'node_modules/bootstrap/dist/css/bootstrap.css'
            ],
            dest: grunt.config.get('dist') + '/concat.css'
        },
        sass: {
            src: [
                //'node_modules/bootstrap/dist/css/bootstrap.css',
                'src/client/**/*.scss'
            ],
            dest: grunt.config.get('dist') + '/concat.scss'
        }
    };
};
