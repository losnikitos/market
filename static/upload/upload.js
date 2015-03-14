angular
    .module('app', ['angularFileUpload'])
    .controller('AppController', function ($scope, FileUploader) {
        $scope.uploader = new FileUploader();

        $scope.uploader.onAfterAddingFile = function (fileItem) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = e.target.result;
                var workbook = XLS.read(data, {type: 'binary'});

                $scope.goods = workbook.Strings.map(function(str) {return str.t});

                //var Sheet1A1 = workbook.Sheets[workbook.SheetNames[0]]['A1'].v;

                console.log($scope.goods);
            };
            reader.readAsBinaryString(fileItem._file);
        };
    });