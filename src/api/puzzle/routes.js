var locationFactory = require('../common/location/factory');

//var contextService = require('../context/service');

var service = require('./service/db');

module.exports = function (api) {
    api.get('/battle', function (request, resolution) {
        console.log('GET request')
        service.find()
            .then(function (puzzle) {
                console.log('then object', puzzle);
                console.log('then task', puzzle.task());
                console.log('then api', puzzle.api());
                resolution.send(puzzle.api());
            })
            .catch(function (error) {
                console.log('catch', error)
                resolution

                    // Returns a 404 because the puzzle doesn't exist.
                    .status(404)

                    // Returns the error object.
                    .send(error);
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
