module.exports = function sass() {
    return {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'dist/concat.css': [
                    'dist/concat.scss'
                ]
            }
        }
    };
};
