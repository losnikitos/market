var parse = require('../lib/parse');

exports.save = require('multer')({
        dest: './uploads/',
        rename: function(fieldname, filename, req, res) {
            console.log(filename);
            return 'uploaded'
        }
    }
);

exports.parse = function (req, res, next) {
    try {
        var goods = parse(req.files.file.path);
        res.send(goods);
    }
    catch(e) {
        res.send(400, e);
    }
};