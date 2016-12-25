var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = Schema({
    name: String,
    description: String,
    role: String,
    ship: {type: Schema.Types.ObjectId, ref: 'Ship'},
    context: {
        scale: String,
        map: String,
        name: String
    }
    // also has a mission it has been generated for.
    // Missions are like quest chains.
});
