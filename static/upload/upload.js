angular
    .module('app', ['angularFileUpload', 'ui.grid'])
    .controller('AppController', function ($scope, FileUploader, $http) {
        $scope.uploader = new FileUploader({ url: '/upload' });
        $scope.grid = {};
        $scope.upload = {};

        // Когда пишем в scope.goods, обновляется грид
        $scope.$watch('goods', function (newValue) {
            $scope.grid.data = newValue;
        });

        // Когда кидаем файл в дропзону, он сразу аплоадится
        $scope.uploader.onAfterAddingFile = function (fileItem) {
            fileItem.upload();
        };

        // Когда файл зааплоадился, и распарсился, показываем данные в таблице
        $scope.uploader.onCompleteItem = function (file, data, status) {
            if (status == 200) {
                $scope.$apply(function () {
                    $scope.upload = { status: 'success', message: 'Done' };
                    $scope.goods = data.map(function (good) {
                        return { name: good, price: '' }
                    })
                });
                askStatus();
            }
            else {
                $scope.upload = { status: 'danger', message: data };
            }
        };

        function askStatus() {
            $http.get('/status')
                .success(function (data) {
                    $scope.wait = data.wait;
                    $scope.goods.forEach(function(good) {
                        data.goods.forEach(function(resGood) {
                            if(resGood.name == good.name)
                            good.price = resGood.price
                        });
                    });
                    console.log(data);
                    if (data.wait > 0) setTimeout(askStatus, 1000)
                })
                .error(function(data) {
                    $scope.upload = {status: 'danger', message: data}
                })
        }
    });