module.exports = {
    // Reward depends on chain time among other things.
    // You get a bonus for quick completion.
    start: ['warp', 'scan'],
    chain: {
        scan: {
            // Intelligence officer scans for pirates. This opens the option of detours.
            // Failure does nothing.
            scale: 'spaceship',
            map: 'quantum',
            name: 'astronomy',
            success: 'detour'
        },
        warp: {
            scale: 'spaceship',
            map: 'interstellar',
            name: 'navigation',
            // Get as far as you can in 5 minutes.
            // At certain check points, you will gather encounter quests anyway.
            // Faster movement minimises encounters.
            // If a certain amount of distance has been amassed, the chain is complete.
            // Increments the chain time.
            success: ['detour', 'hacking']
        },
        detour: {
            // Another navigation quest.
            // Increments the chain time.
            // If chosen, the hacking option is no longer available until failure.
            excludes: 'hacking',
            scale: 'spaceship',
            map: 'interstellar',
            name: 'navigation',
            success: ['warp', 'scan'],
            failure: 'hacking'
        },
        hacking: {
            // If you take this option, you might be able to move straight past pirates without fighting quickly.
            // If chosen, the detour option (if available) is no longer available.
            excludes: 'detour',
            scale: 'nanoscale',
            map: 'cyberspace',
            name: 'hacking',
            success: function () {
                // if you shut down their engines, you can go back to warp
            },
            failure: 'combat'
        },
        combat: {
            // Increments the chain time.
            scale: 'spaceship',
            map: 'interplanetary',
            name: 'combat',
            success: ['warp', 'scan', 'board'],
            failure: 'repel'
        },
        repel: {
            // Increments the chain time.
            // pirates get on board
            scale: 'humanoid',
            map: 'vessel', // Map is your own vessel
            name: 'boarding',
            success: 'warp',
            // on failure, you lose the cargo and therefore the chain
        }
    }
};
