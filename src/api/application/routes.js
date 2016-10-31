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
    require('glob')('*/routes.js', {
        cwd: '../'
    }, function (er, paths) {
        // files is an array of filenames.
        // If the `nonull` option is set, and nothing
        // was found, then files is ["**/*.js"]
        // er is an error object or null.
        console.log(paths)
        paths.forEach(require);
    });
};
