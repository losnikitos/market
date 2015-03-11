var express = require('express'),
    app = express(),
    config = require('./config');

app.get('/', function (req, res) {
    res.send('Hello World!!!!')
});

var server = app.listen(config.server.port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server started at http://%s:%s', host, port)
});