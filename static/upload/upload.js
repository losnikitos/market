angular
    .module('app', ['angularFileUpload', 'ui.grid'])
    .controller('AppController', function ($scope, FileUploader) {
        $scope.uploader = new FileUploader();
        $scope.grid = {};

        $scope.$watch('goods', function(newValue) {
            $scope.grid.data = newValue;
        });

        $scope.uploader.onAfterAddingFile = function (fileItem) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLS.read(data, { type: 'binary' });

                var goods = workbook.Strings.map(function (str) { return str.t });
                $scope.$apply(function() {
                    $scope.goods = goods.map(function (good) { return { name: good, price: '' } });
                });
            };
            reader.readAsBinaryString(fileItem._file);
        };
    });