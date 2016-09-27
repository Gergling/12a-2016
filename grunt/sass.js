module.exports = function sass() {
    return {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'dist/concat.css': [
                    'node_modules/bootstrap/dist/css/bootstrap.css',
                    'dist/concat.scss'
                ]
            }
        }
    };
};
