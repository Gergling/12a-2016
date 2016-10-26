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
        cost: {} // This is a pairing of capacitor name against value.
    };
    
    // Effect might be too complicated to boil down to an object except for API purposes.
    function effect(fnc) {
        if (fnc !== undefined) {
            data.effect = fnc.bind(this);
        }
        return data.effect;
    }
    
    function canCast() {
        // Check if capacitors contain sufficient value.
    }
    function cast() {
        // When the effect occurs, all attributes need to be calculated, including skill-affected attributes.
        Object.keys(data.cost).forEach(function (capacitorName) {
            // Find costs.
            Object.keys(data.cost[capacitorName].skill).forEach(function (reference) {
                var weight = data.cost[capacitorName].skill[reference];
                // Use weight against skill level to reduce cost of ability somehow.
            });
            // Reduction could be 1 - skill or 1 / skill.
            // Apply cost to capacitor.
        });
    }
}

function instantiate(config) {
    
}

module.exports = instantiate;
