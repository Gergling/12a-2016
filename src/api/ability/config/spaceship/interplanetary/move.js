// This ability is designed to perform technical tests only.
module.exports = {
    label: 'Move',
    cooldown: 1,
    range: {
        min: 1,
        max: 1,
        special: 'is-empty'
    },
    effect: function (tile, targets) {
        console.log(tile, targets);
    }
};
