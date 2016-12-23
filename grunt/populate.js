// Repopulate the database from scratch.
// Initial values can be handled in specific modules.

var q = require('q');

// Connect to the database.
var db = require('../src/api/application/db');
var mongoose = db.mongoose;

var playerService = require('../src/api/player/service');

// Drop the database.
function reset(grunt) {
    var deferred = q.defer();
    grunt.log.write('Truncating database... ');
    mongoose.connection.on('open', function(){
        //playerService.model.remove({}, function () {
        mongoose.connection.db.dropDatabase(function () {
            grunt.log.ok('Done.');
            createPlayer(grunt).then(function () {
                deferred.resolve();
            });
        });
    });
    return deferred.promise;
}

// Create a player.
function createPlayer(grunt) {
    var deferred = q.defer();
    var player = playerService.instantiate({
        name: 'Scorpanok'
    });
    grunt.log.write('Creating a player... ');
    player.save(function () {
        grunt.log.ok('Done.');
        deferred.resolve();
    });
    return deferred.promise;
}

// Create a battle for player.
function createBattle() {

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
    }).catch(function () {
        grunt.log.error('Repopulation failed.');
        done(false);
    });
}

module.exports = populate;
