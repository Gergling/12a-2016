var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static('./src/client/'));
app.use(express.static('./dist/'));

require('./routes.js')(app);

app.listen(port);

module.exports = app;
