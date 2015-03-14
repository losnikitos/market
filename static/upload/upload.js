angular
    .module('app', ['angularFileUpload'])
    .controller('AppController', function ($scope, FileUploader) {
        $scope.uploader = new FileUploader();

        $scope.uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
    });