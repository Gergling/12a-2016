module.exports = function (grunt) {
    var files = {};
    files[grunt.config.get('dist') + '/index.html'] = 'src/client/index.html.tpl';
    return {
        index: {
            files: files
        }
    }    
};
