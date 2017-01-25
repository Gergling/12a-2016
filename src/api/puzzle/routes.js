var locationFactory = require('../common/location/factory');

var service = require('./service/db');

module.exports = function (api) {
    api.get('/battle', function (request, resolution, next) {
        service.find()
            .then(function (puzzle) {
                resolution.send(puzzle.api());
            })
            .catch(function (error) {
                // Returns a 404 because the puzzle doesn't exist.
                resolution.status(500);
                next(error);
            });
    });

    api.post('/battle', function (request, resolve) {
        // Receive ability by name, sprite tile and targeted tile.
        require('./service/ability').cast(
            request.query.name,
            locationFactory(request.query.location),
            locationFactory(request.query.target)
        );
        // probably returns a promise
        // If no targeted tile, assume sprite's tile
        //resolution.send()
    });
};
