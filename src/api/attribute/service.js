var configFactory = require('./factory/config');
var dbFactory = require('./factory/db');

var configTree = factory();

// Creates a new tree instance based on the config structure.
function create() {
    configTree.populate();
    return configTree();
}

// Form config tree from the yaml file.
// If this is asynchronous, run it in a function and handle from server startup with a promise.

module.exports = {
    create: create
};
