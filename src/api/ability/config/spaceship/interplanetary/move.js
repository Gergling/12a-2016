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
        // sprite at tile loses one move action and an amount of energy dependent on engines and pilot attributes, which can be enhanced with personnel and buff sub-attributes
        // sprite moves to target location (targets is an array of locations, but will only contain one).
    }
};
