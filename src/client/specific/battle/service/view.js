// Handles battle view such as selected sprite.
angular.module('battle').service('battleServiceView', function (
    commonIsometricFactoryEvent,
    spriteService
) {
    var data = {
        event: commonIsometricFactoryEvent(),
        select: false
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

    function spriteActivate() {
        data.select = true;
    }

    event().on('select', function (tile) {
        if (data.select) {
            // In ability mode the above should be ignored, and a target location should be selected
            // for the selected sprite's ability.
        } else {
            // Selects sprite if one inhabits the tile.
            // This should apply on in a sprite mode.
            sprite(spriteService.list().filter(function (sprite) {
                return tile.location().equals(sprite.tile().location());
            })[0]);
        }
    });

    return {
        sprite: sprite,
        event: event,
        spriteActivate: spriteActivate
    };
});
