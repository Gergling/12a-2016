module.exports = function copy(grunt) {
    return {
        font: {
            expand: true,
            cwd: 'node_modules/bootstrap/',
            src: 'fonts/*',
            dest: grunt.config.get('dist')
        },
        img: {
            expand: true,
            cwd: 'src/client/',
            src: '**/img/**',
            dest: grunt.config.get('dist') + '/img'
        }
    };
};
