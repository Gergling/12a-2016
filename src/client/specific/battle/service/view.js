// Handles battle view such as selected sprite.
angular.module('battle').service('battleServiceView', function () {
    var data = {};

    // Sets/returns the currently selected sprite.
    function sprite(value) {
        if (value !== undefined) {
            data.sprite = value;
        }
        return data.sprite;
    }

    return {
        sprite: sprite
    };
});
