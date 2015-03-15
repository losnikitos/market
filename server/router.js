var upload = require('./controllers/upload');

module.exports = function(app) {
    app.get('/', function(req,res){ res.sendfile('../static/index.html') });
    app.post('/upload', upload.save, upload.parse);
};