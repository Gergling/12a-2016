var rangeFactory = required('./range');

function Cost() { // May as well create this with whatever parameters required.
    var data = {
        costs: {}, // Key\value mapping of capacitor names against cost values.
        debts: [] // List oc capacitor names which cannot afford the cost.
    };
    
    function apply() {
        // Apply costs
    }
    
    return {
        apply: apply
    };
}

function Ability() {
    var data = {
        name: '',
        label: '',
        scale: '',
        map: '',
        cooldown: 0, // The number of turns which goes by before the ability becomes available again.
        area: 0, // Area affected by ability. Would probably be a mixed value.
        cost: {} // This is a pairing of capacitor name against value.
    };

    this[key] = function getterSetter(value) {
        if (value !== undefined) {
            data[key] = value;
        }
        return data[key];
    };

    data.range = rangeFactory();
    
    // Effect might be too complicated to boil down to an object except for API purposes.
    function effect(fnc) {
        if (fnc !== undefined) {
            data.effect = fnc.bind(this);
        }
        return data.effect;
    }
    
    function cost() {
        // Return an object expressing a list of costs against capacitors,
        // whether or not there is sufficient value in the capacitors,
        // and the ability to apply the costs.
    }
    function canCast() {
        // Check if capacitors contain sufficient value.
    }
    function cast(caster) {
        // When the effect occurs, all attributes need to be calculated, including skill-affected attributes.
        Object.keys(data.cost).forEach(function (capacitorName) {
            // Find costs.
            var weight = data.cost[capacitorName];
            [
                'skill',
                'equipment',
                'buff'
            ].forEach(function (prop) {
                weight[prop] = {};
                Object.keys(weight[prop]).forEach(function (reference) {
                    //weight[prop][reference]
                    // Use weight against skill level to reduce cost of ability somehow.
                    // Getting the skill level for the user would be caster.skill(reference).
                    // Getting the equipment would be caster.equipment(reference).
                    // Getting the buff would probably be complicated... caster.buff(reference)?
                    // That implies you can apply a buff to a caster and it applies here somehow... 
                    // maybe ability.[abilityName] if it's applied to the caster.
                });
                // Reduction could be 1 - skill or 1 / skill.
                // cost = weight[prop][reference] / Math.pow(skill, 2); // Depends on scaling apparently.
                
            });
            // Apply cost to capacitor.
        });
    }

    function range() {return data.range;}

    // Public
    this.range = range;
}

function instantiate(scale, map, name, config) {
    var ability = new Ability();
    ability.scale(scale);
    ability.map(map);
    ability.name(name);
    if (config !== undefined) {
        if (config.range !== undefined) {
            ability.range().set(config.range);
        }
    }
    return ability;
}

module.exports = instantiate;
