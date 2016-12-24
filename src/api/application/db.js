var db = {};
db.mongoose = require('mongoose');
function connect() {
    db.connection = db.mongoose.connect('mongodb://localhost/12a/2016')
}
connect();

db.connect = connect;

module.exports = db;
