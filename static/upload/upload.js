angular
    .module('app', ['angularFileUpload', 'ui.grid'])
    .controller('AppController', function ($scope, FileUploader) {
        $scope.uploader = new FileUploader();
        $scope.grid = {};

        $scope.uploader.onAfterAddingFile = function (fileItem) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLS.read(data, { type: 'binary' });

                var goods = workbook.Strings.map(function (str) { return str.t });
                $scope.grid.data = goods.map(function (good) { return { name: good, price: '' } });
                $scope.$apply();
            };
            reader.readAsBinaryString(fileItem._file);
        };
    });