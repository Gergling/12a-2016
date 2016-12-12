angular.module('map').service('mapService', function () {
    // track activation mode from here
    var data = {};

    function mode(value) {
        if (value !== undefined) {
            data.mode = value;
        }
        return data.mode;
    }

    return {
        mode: mode
    }
});
