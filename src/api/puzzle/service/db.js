var q = require('q');

// Here we would setup a battle in the database and get the data back from it.

var mongoose = require('mongoose');

var Battle = mongoose.Model('Battle', require('../schema'));

// Temporary tile generator.
var tiles = [];
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

// This will find the player's battle object.
// If the player doesn't currently have a battle, this will return an appropriate rejection.
// This is to legitimately check whether the player is in battle, so that they can be given a list of quests.
function find() {
}

// This will ultimately be passed a mission object to configure the battle object.
// From that it will create a mongoose model and save.
// The function will return a promise.
function create() {
    var deferred = q.defer();
    var battle = new Battle({
        scale: 'spaceship',
        map: 'interplanetary',
        sprites: [
            {
                name: 'vessel',
                location: {
                    x: 0,
                    y: 0
                },
                abilities: [
                    {
                        name: 'move',
                        tiles: [
                            {x: 0, y: 1},
                            {x: 1, y: 0}
                        ]
                    }
                ]
            }
        ],
        tiles: tiles
    });
    battle.save(function (err) {
        if (err) {
        } else {
            deferred.resolve(battle);
        }
    });
    return deferred.promise;
}

module.exports = {
    find: find
}
