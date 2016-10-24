module.exports = {
    label: 'Extend Defenses',
    range: {
        minimum: 1,
        maximum: 1
    },
    cooldown: 0,
    toggle: true,
    cost: {
        energy: 1
    },
    effect: {
        start: function () {
            //var numeric = require('../../../common/numeric');
            var caster = this.caster().sprite();
            [
                'ams',
                'shield'
            ].forEach(function (defense) {
                //var spare = caster.capacitor(defense).maximum().multiply(0.5);
                //numeric.multiply(this.target().sprite().capacitor(defense).maximum)
                // Need a way for maximum to half and for the target defense maximum to double.
                // Recharge is also halved.
            }.bind(this));
        }
    }
};
