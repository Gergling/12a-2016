module.exports = {
    start: 'interstellar',
    chain: {
        interstellar: {
            // Every star system tile visited generates a visited system.
            // Tiles can also generate emergency space combat scenarios.
            role: 'navigator',
            scale: 'spaceship',
            map: 'interstellar'
        },
        interplanetary: {
            // Every planet visited generates a list of available services.
            role: 'navigator',
            scale: 'spaceship',
            map: 'interplanetary'
        }
    }
};
