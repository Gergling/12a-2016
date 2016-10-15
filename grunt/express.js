module.exports = function express(grunt) {
    return {
        server: {
            options: {
                script: 'src/api/application/controller/server.js',
                port: 8080
            }
        }
    };
};
