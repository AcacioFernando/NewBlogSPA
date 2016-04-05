angular.module("myApp").controller("noticiaCtrl", function ($scope, $http, $routeParams, $sce ) {

    $scope.noticia;
    $scope.comentarios = [];
    $scope.conteudo = "";
    $scope.comentario = {};


    var carregarNoticias = function () {

        $http.get("/buscarnoticia/" + $routeParams.value).success(function (data) {
            $scope.noticia = data;
            $scope.conteudo = data.content;
            $scope.comentarios = data.comments;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.to_trusted = function(html_code) {
        console.log($sce.trustAsHtml(html_code));
        return $sce.trustAsHtml(html_code);
    }

    $scope.submitComentario = function () {
        console.log($scope.comentario);
        $http.post('/submitcomentario/'+ $scope.noticia._id, $scope.comentario).success(function (data) {
            console.log("posted successfully");
            $scope.comentarios = data;
        }).error(function (data) {
            console.error("error in posting");
        });

    };


    $scope.gosteiNoticia = function (idNoticia) {
        console.log("id: " + idNoticia);
        $http.get("/gosteinoticia/" + idNoticia).success(function () {
            $scope.noticia.gostei = $scope.noticia.gostei + 1;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.naoGosteiNoticia = function (idNoticia) {
        console.log("id: " + idNoticia);
        $http.get("/naogosteinoticia/" + idNoticia).success(function () {
            $scope.noticia.nao_gostei = $scope.noticia.nao_gostei + 1;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };


    carregarNoticias();

});