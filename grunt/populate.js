// Repopulate the database from scratch.
// Initial values can be handled in specific modules.

var q = require('q');

// Connect to the database.
var db = require('../src/api/application/db');
var mongoose = db.mongoose;

var playerFactory = require('../src/api/player/factory');
var shipFactory = require('../src/api/ship/factory');
var taskFactory = require('../src/api/task/factory/db');
var contextService = require('../src/api/context/service');

// Drop the database.
function reset(grunt) {
    var deferred = q.defer();
    grunt.log.write('Connecting to database... ');
    mongoose.connection.on('open', function () {
        grunt.log.ok('Done.');
        grunt.log.write('Truncating database... ');
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

                    createTask(grunt, ship, 'War on Piracy', [
                        'There are pirates in the area.',
                        'Piracy must be stamped out at every opportunity.',
                        'For every pirate killed, captured or effectively interrogated, you will receive a reward.',
                        'For every pirate vessel destroyed or commandeered, you will receive a reward.'
                    ].join(' '), 'tactician')
                        .then(function (task) {
                            createPuzzle(grunt, player, task)
                                .then(deferred.resolve)
                                .catch(deferred.reject);
                        })
                        .catch(deferred.reject);
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

function createTask(grunt, ship, name, description, role) {
    var deferred = q.defer();
    var task = taskFactory({
        name: name,
        description: description,
        role: role,
        ship: ship,
        context: {
            scale: 'spaceship',
            map: 'interplanetary',
            name: 'combat'
        }
    });
    grunt.log.writeln('Creating a task... ');
    task.save().then(function () {
        deferred.resolve(task);
        grunt.log.ok('Task created.');
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

    // Player will be allowed to select a ship and a role.
    player.ship(ship, 'tactician');

    // Need to find a ship in the database first.
    grunt.log.writeln('Creating a player... ');

    // Later on the player will choose a role aboard a ship before they can move forward.
    // In fact, they will have to be given a list of ships with available roles, and be able to filter by 
    // available role slots.
    // There will always be an available role on a new ship which the company allows because either there 
    // are no open slots for your role, or you fancy a change because your crewmates are dickheads.
    player.save().then(function () {
        grunt.log.ok('Player created.');
        // create tasks here

        // create battle here
        // it will probably require a task object
        // assign to player object
        // because that is how execution will occur in the game
        // battle service should return an object which can express itself as a mongoose object if requested
        deferred.resolve(player);
    }).catch(deferred.reject);
    return deferred.promise;
}

// Create a battle for player.
function createPuzzle(grunt, player, task) {
    var deferred = q.defer();
    // player should generate battle based on task
    grunt.log.writeln('Creating a puzzle...');
    player.startPuzzle(task)
        .then(function (puzzle) {
            grunt.log.ok('Puzzle created.');
            deferred.resolve(puzzle);
        })
        .catch(deferred.reject);
    return deferred.promise;
}

// Run the population.
function populate(grunt) {
    var done = grunt.task.current.async();
    // By default this creates a battle to test from.
    // Later we will need to run this without creating a battle as an option to test
    grunt.log.writeln('Repopulating full database.');
    contextService.load().then(function () {
        reset(grunt).then(function () {
            grunt.log.ok('Repopulation complete.');
            done(true);
        }).catch(function (error) {
            grunt.log.error('Repopulation failed.');
            grunt.fail.fatal(error);
            done(false);
        });
    }).catch(function (error) {
        grunt.log.error('Context loading failed.');
        grunt.fail.fatal(error);
        done(false);
    });
}

module.exports = populate;
