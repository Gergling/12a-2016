var locationFactory = require('../common/location/factory');

//var contextService = require('../context/service');

var service = require('./service/db')

module.exports = function (api) {
    api.get('/battle', function (request, resolution) {
        service.find().then(resolution.send);
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
