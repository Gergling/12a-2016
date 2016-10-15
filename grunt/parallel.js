module.exports = function (grunt) {
    return {
        server: {
            options: {
                stream: true
            },
            tasks: [
                {
                    grunt: true,
                    args: ['watch:src']
                },
                {
                    grunt: true,
                    args: ['watch:server']
                },
                {
                    grunt: true,
                    args: ['watch:quest']
                }
            ]
        }
    };
};
