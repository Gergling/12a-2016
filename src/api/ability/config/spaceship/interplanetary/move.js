module.exports = {
    label: 'Move',
    description: 'Move to an adjacent tile.',
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
