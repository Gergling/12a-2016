module.exports = function eslint() {
    return {
        app: {
            options: {
                configFile: 'config/eslint-app.json'
            },
            src: ['client/app/**/*.js']
        },
        spec: {
            options: {
                configFile: 'config/eslint-spec.json'
            },
            src: ['unittest/spec/**/*.js']
        },
        grunt: {
            options: {
                configFile: 'config/eslint-grunt.json'
            },
            src: ['GruntTasks/*.js']
        },
        gruntFile: {
            options: {
                configFile: 'config/eslint-grunt.json'
            },
            src: ['GruntFile.js']
        }
    };
};
