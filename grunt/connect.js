module.exports = function connect() {
    return {
        options: {
            livereload: true
        },
        livereload: {
            options: {
                hostname: 'localhost',
                port: 8080,
                useAvailablePort: true,
                base: [
                    'src/client/',
                    'dist/'
                ]
            }
        }
    };
};
