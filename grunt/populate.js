// Repopulate the database from scratch.
// Initial values can be handled in specific modules.

var q = require('q');

// Connect to the database.
var db = require('../src/api/application/db');
var mongoose = db.mongoose;

var playerFactory = require('../src/api/player/factory');
var shipFactory = require('../src/api/ship/factory');

// Drop the database.
function reset(grunt) {
    var deferred = q.defer();
    grunt.log.write('Truncating database... ');
    mongoose.connection.on('open', function(){
        mongoose.connection.db.dropDatabase(function () {
            grunt.log.ok('Done.');
            createShip(grunt).then(function (ship) {
                createPlayer(grunt, ship).then(function (player) {
                    grunt.log.ok([
                        'Please welcome captain',
                        player.name(),
                        'of the',
                        ship.name() + '.'
                    ].join(' '));
                    deferred.resolve();
                }).catch(deferred.reject);
            }).catch(deferred.reject);
        });
    });
    return deferred.promise;
}

// Create a ship... or perhaps multiple ships.
function createShip(grunt) {
    var deferred = q.defer();
    var ship = shipFactory({
        name: 'Scorpanok'
    });
    grunt.log.writeln('Creating a ship... ');
    ship.save().then(function () {
        deferred.resolve(ship);
        grunt.log.ok('Ship created.');
    }).catch(deferred.reject);
    return deferred.promise;
}

// Create a player.
function createPlayer(grunt, ship) {
    var deferred = q.defer();

    // Create a player.
    var player = playerFactory({
        name: 'Soundwave'
    });

    // Player will be allowed to select a ship.
    player.ship(ship);

    // Need to find a ship in the database first.
    grunt.log.writeln('Creating a player... ');

    // Later on the player will choose a role aboard a ship before they can move forward.
    // In fact, they will have to be given a list of ships with available roles, and be able to filter by 
    // available role slots.
    // There will always be an available role on a new ship which the company allows because either there 
    // are no open slots for your role, or you fancy a change because your crewmates are dickheads.
    player.save().then(function () {
        grunt.log.ok('Player created.');
        // create missions here

        // create battle here
        // it will probably require a mission object
        // assign to player object
        // because that is how execution will occur in the game
        // battle service should return an object which can express itself as a mongoose object if requested
        deferred.resolve(player);
    }).catch(deferred.reject);
    return deferred.promise;
}

// Create a battle for player.
function createBattle(grunt) {
    var deferred = q.defer();
    deferred.resolve();
    return deferred.promise;
}

// Run the population.
function populate(grunt) {
    var done = grunt.task.current.async();
    // By default this creates a battle to test from.
    // Later we will need to run this without creating a battle as an option to test
    grunt.log.writeln('Repopulating full database.');
    reset(grunt).then(function () {
        grunt.log.ok('Repopulation complete.');
        done(true);
    }).catch(function (error) {
        grunt.log.error('Repopulation failed: ' + error);
        done(false);
    });
}

module.exports = populate;
