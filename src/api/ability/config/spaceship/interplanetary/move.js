// This ability is designed to perform technical tests only.
module.exports = {
    label: 'Move',
    cooldown: 1,

    tiles: function (tile) {
        // Find available tiles for this ability when cast by this sprite.
        // In this case, any adjacent tiles.
    },
    effect: function (tile, targets) {
        console.log(tile, targets);
    }
};
