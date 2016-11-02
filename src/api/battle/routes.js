module.exports = function (api) {
    var tiles = [];

    // Temporary tile generator
    var x = 0, z = 0;
    for (z = 0; z < 4; z += 1) {
        for (x = 0; x < 4; x += 1) {
            tiles.push({
                name: 'empty',
                location: {
                    x: x,
                    y: z
                }
            });
        }
    }

    api.get('/battle', function (req, res) {
        res.send({
            scale: 'spaceship',
            name: 'interplanetary',
            tiles: tiles,
            sprites: [
                {
                    name: 'vessel',
                    location: {
                        x: 0,
                        y: 0
                    },
                    abilities: ['dostuff']
                }
            ],
            abilities: [
                {
                    name: 'dostuff'
                }
            ]
        });
    });
};
