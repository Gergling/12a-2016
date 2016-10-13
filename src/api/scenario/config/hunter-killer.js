// Hunt down a ship (probably pirates) and destroy them.
// Campaigns involve seek, followed by destroy.
// Failures depend on degree of failure.
// Starts with an astronomy mission. Failure requires repetition of the mission.
// Success results in a warp chase mission.

module.exports = {
    chain: {
        seek: {
            // Objective is to pick up the trail of the ship.
            scale: 'spaceship',
            map: 'quantum',
            name: 'astronomy',
            success: 'chase',
            failure: 'seek'
        },
        chase: {
            // Objective is to catch up with the ship.
            scale: 'spaceship',
            map: 'interstellar',
            name: 'chase',
            success: 'hack',
            failure: 'chase',
        },
        hack: {
            // Objective is to shut down as many of the ship's systems as possible before getting into weapons range.
            // Failures are conditional.
        },
        combat: {
            // Objective is to destroy the ship.
            // Failures are conditional.
        }
    }
};
