// Attributes:
// - Visibility
// - Defense
// - Engine
// - Reactor

// Capacitors:
// - Defense
// - Speed
// -- Maximum depends on engine hardware
// -- Moving reduces current
// -- Current is fully replenished each round
// - Energy
// -- Maximum depends on reactor hardware and engineering skills
// -- Current is reduced by certain abilities, depending on certain engineering abilities
// -- Current is replenished each round depending on power from reactor hardware, and abilities depending on engineering skills
// - Weapons, similar to above but for ship weapon skills

module.exports = {
    attribute: {
        // Defenses
    },
    capacitor: {
        // Defenses
        ams: {
            
        },
        speed: {
            max: function () {
                // Engine, buffs
            },
            current: 'full',
        }
    }
};
