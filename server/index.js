var express = require('express'),
    app = express(),
    config = require('./config');

app.use(express.static(__dirname + '/../static'));

var server = app.listen(config.server.port, function () {
    var port = server.address().port;
    console.log('Listening http://localhost://%s', port)
});
