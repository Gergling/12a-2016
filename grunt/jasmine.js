module.exports = function jasmine(grunt) {
    var src = [
        'client/app/module.js',
        'client/app/*/*/module.js',
        'client/app/**/*.js'
    ];
    var specs = [];
    var helpers = [
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        'node_modules/angular-mocks/angular-mocks.js'
    ];
    var outfile = 'report/SpecRunner.html';
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    return {
        quest: {
            src: '', // glob all quest configs
            options: {
                outfile: outfile,
                display: 'full',
                summary: false, // No summary as it is too much information.
                specs: specs, // needs a specific file
                helpers: helpers
            }
        },
        app: {
            src: src,
            options: {
                outfile: outfile,
                display: 'full',
                summary: false, // No summary as it is too much information.
                specs: specs,
                helpers: helpers
            }
        },
        // A summary version so that I can see the test that fail rather than
        // scrolling up the console like a caveman.
        summary: {
            src: src,
            options: {
                outfile: outfile,
                display: 'full', // Including full display to show logs.
                summary: true,
                specs: specs,
                helpers: helpers
            }
        },
        // This is purely to output the coverage.
        coverage: {
            src: src,
            options: {
                outfile: outfile,
                display: 'none',
                specs: specs,
                helpers: helpers,
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: 'report/coverage.json',
                    report: [
                        { type: 'text' }
                    ],
                    thresholds: {
                        statements: 20,
                        branches: 0,
                        functions: 5,
                        lines: 20
                    }
                }
            }
        }
    };
};
