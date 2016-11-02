// Bring in all routes.js files from other modules and turn them into express functions.
// This needs to be a file for processing how all the routes work and where they come from,
// and it needs to be in the application module.
module.exports = function (api) {
    // Attach and process for api injection all at:
    // ../*/routes.js
    // Require every item that array returns.
    // Use the returned content to generate the APIs.

    // Start by assuming format is simply an array of methods.
    // Expand from there.
    require('glob')('src/api/*/routes.js', {}, function (error, paths) {
        if (error) {
            throw error;
        }
        paths.map(function (path) {
            return '../../' + path.replace('.js', '').replace('src/api/', '');
        }).forEach(function (path) {
            var route = require(path);
            if (typeof route === 'function') {
                route(api);
            } else {
                throw new Error('api/application/controller/routes: Route configuration at "' + path + '" is not a function');
            }
        });
    });
};
