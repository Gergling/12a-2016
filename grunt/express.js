var path = require('path');

module.exports = function express(grunt) {
    return {
        server: {
            options: {
                script: 'src/api/application/controller/server.js',
                port: 8080
            },
            livereload: {
                options: {
                    server: path.resolve('./app.js'),
                    livereload: true,
                    serverreload: true,
                    bases: [path.resolve('./public')]
                }
            }
        }
    };
};
