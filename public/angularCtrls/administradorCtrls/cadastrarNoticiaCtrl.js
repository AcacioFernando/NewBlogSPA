angular.module("myApp").controller("cadastrarNoticiaCtrl", function ($scope, $http, $routeParams) {
    $scope.app = "Lista Telefonica";
    $scope.categorias =[];
    $scope.noticia;
 /*   $scope.editorOptions = {
        language: 'pt'
        // uiColor: '#000000'
    };
    $scope.test ="";*/
    var carregarCategorias= function () {
        console.log("Entrei cadastar noticias")
        $http.get("/admin/buscarcategorias").success(function (data) {
            console.log(data);
            $scope.categorias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

/*    $scope.save = function(){

        var conteudo = $scope.noticia.content;
        console.log(conteudo);
    };*/
    carregarCategorias();
});

angular.module("myApp").controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {

    $scope.noticia;

    $scope.editorOptions = {
        language: 'pt'
        // uiColor: '#000000'
    };

    $scope.save = function(){

        var conteudo = $scope.noticia.content;
        console.log(conteudo);
    };

    $scope.uploadPic = function(file, noticia) {
        console.log("File: ");
        console.log(file);
        console.log("Noticia: ");
        console.log(noticia);


        file.upload = Upload.upload({
            url: '/cadastrarnoticia/uploadform',
            data: {file: file, noticia: noticia},
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }
}]);