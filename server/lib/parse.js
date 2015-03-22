var XLSX = require('xlsx'),
    _ = require('lodash');

module.exports = function parse(filename) {
    var wb = XLSX.readFile(filename),
        firstSheetName = wb.SheetNames[0],
        ws = wb.Sheets[firstSheetName],
        allCellsRange = ws['!ref'],
        allCells = XLSX.utils.decode_range(allCellsRange),
        rowsCount = allCells.e.r;

    var goods = [];
    for (var i = 1; i <= rowsCount; i++) {
        var a = ws['A' + (i + 1)] && ws['A' + (i + 1)].v,
            b = ws['B' + (i + 1)] && ws['B' + (i + 1)].v;

        if (b) {
            goods.push(a + ' ' + b)
        }
    }
    return _.unique(goods);
};
