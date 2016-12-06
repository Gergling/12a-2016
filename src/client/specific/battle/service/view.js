// Handles battle view such as selected sprite.
angular.module('battle').service('battleServiceView', function (
    commonIsometricFactoryEvent,
    spriteService
) {
    var data = {
        event: commonIsometricFactoryEvent()
    };

    // Sets/returns the currently selected sprite.
    function sprite(value) {
        if (value !== undefined) {
            data.sprite = value;
        }
        return data.sprite;
    }

    function event() {
        return data.event;
    }

    event().on('select', function (tile) {
        sprite(spriteService.list().filter(function (sprite) {
            return tile.location().equals(sprite.tile().location());
        })[0]);
    });

    return {
        sprite: sprite,
        event: event
    };
});
