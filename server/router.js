var market = require('./controllers/market');

module.exports = function(app) {
    app.get('/', function(req,res){ res.sendfile('../static/index.html') });
    app.post('/upload', market.upload, market.parse);
    app.get('/status', market.status);
};