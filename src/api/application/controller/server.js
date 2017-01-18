var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

require('../db');

// Todo: Start everything else when the db connection succeeds.
// Otherwise fail with message.

require('../../context/service')
    .load()
    .catch(function (error) {
        throw error;
    });

app.use(express.static('./src/client/'));
app.use(express.static('./dist/'));

require('./routes.js')(app);

app.listen(port);

module.exports = app;
