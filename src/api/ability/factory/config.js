function Ability() {
    var data = {
        name: '',
        label: '',
        range: {
            minimum: 0,
            maximum: 0
        },
        cooldown: 0, // The number of turns which goes by before the ability becomes available again.
        area: 0, // Area affected by ability. Would probably be a mixed value.
        cost: {}, // This is a pairing of capacitor name against value.
        effect: function effect() {}
    };
    
    // Effect might be too complicated to boil down to an object except for API purposes.
}

function instantiate() {

}

module.exports = instantiate;
