var XLS = require('xlsjs');

exports.save = require('multer')({
        dest: './uploads/',
        rename: function(fieldname, filename, req, res) {
            console.log(filename);
            return 'uploaded'
        }
    }
);

exports.parse = function (req, res, next) {
    var wb = XLS.readFile(req.files.file.path);
    var goods = wb.Strings.map(function (str) {
        return str.t
    });
    res.send(goods);
};