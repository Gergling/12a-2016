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
            success: 'hacking',
            failure: 'chase',
        },
        hacking: {
            // Objective is to shut down as many of the ship's systems as possible before getting into weapons range.
            // Failures are conditional.
            scale: 'component',
            map: 'cyberspace',
            name: 'hacking',
            success: function () {
                // Engines open the combat mission.
                // Engines, defenses and weapons open the boarding mission.
            },
            failure: function () {
                // Loss of engines involves an emergency engine repair quest.
                // Loss of defenses or weapons opens repair quests.
                // Defenses or weapons will be offline in combat missions until repaired.
                // Loss of all systems opens 'repel'
            }
        },
        engines: {
            // Repair the engines.
            emergency: true,
            success: 'seek',
            failure: 'engines'
        },
        weapons: {
            // Repair the weapons
        },
        defenses: {
            // Repair the defenses
        },
        combat: {
            // Objective is to destroy the ship.
            scale: 'spaceship',
            map: 'interplanetary',
            name: 'combat',
            success: ['boarding', 'destroy']
            // Failures are conditional.
        },
        boarding: {
            scale: 'humanoid',
            map: 'vessel', // Enemy ship
            success: 'destroy', // This rewards loot
            failure: 'destroy'
        },
        repel: {
            scale: 'humanoid',
            map: 'vessel', // Your ship
            success: ['boarding', 'combat'],
            failure: {
                next: 'escape',
                description: function (description) {
                    return [
                        'Your crew fail to repel the',
                        description.crew,
                        'boarding party. Everyone is taken prisoner.',
                        'Your ship is scavenged for parts and cargo. They even find your \'personal\' literature.'
                    ];
                }
            }
        },
        escape: {
            scale: 'humanoid',
            map: 'vessel', // Enemy ship
            name: 'boarding',
            success: {
                next: 'boarding', // Also needs to open all repair quests after this.
                // Chains need to have status flags and such.
                description: function (description) {
                    return [
                        'You liberate your crew. Now you endeavour to take the ship.',
                        'Perhaps a few \'souvenirs\' as well.'
                    ];
                }
            },
            failure: 'escape'
        },
        destroy: {
            // This is this objective.
        }
    }
};
