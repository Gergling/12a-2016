var mongoose = require("mongoose");

var Schema = mongoose.Schema({
    name: String,
    level: Number,
    trainingHours: Number,
    lastTrained: Date,
    children: [ Schema ]
});

var Model = mongoose.model("Skill", SkillSchema);

var tree = require("../tree");

var q = require('q');

function load() {
    var deferred = q.defer();

    // Todo: make a promise wrapper utility for the database.
    // DB Callback utility?
    Model.find({}, function (error, results) {
        if (error) {
            deferred.reject(error);
        } else {
            tree.load(results);
            deferred.resolve(tree);
        }
    });

    return deferred.promise;
}

function save() {
    var deferred = q.defer();

    var model = new Model();

    model.save(function (error, results) {
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve(results);
        }
    });

    return deferred.promise;
}

module.exports = {
    load: load,
    save: save
};
