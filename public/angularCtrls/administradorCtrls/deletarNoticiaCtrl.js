angular.module("myApp").controller("deletarNoticiaCtrl", function ($scope, $http, $routeParams) {
    $scope.noticias = [];

    var carregarNoticias = function () {
        console.log("Entrei aqui deletar");
        $http.get("/admin/buscarnoticiasdeletar").success(function (data) {
            console.log(data);
            $scope.noticias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.deletarNoticia = function (value) {
        console.log("Entrei aqui noticias: " + value);
        var lstNoticia = $scope.noticias;
        $http.get("/admin/deletarNoticia/" + value).success(function (data) {

            $scope.noticias = lstNoticia.filter(function (noticia) {
                if (noticia._id != value) {
                    return noticia;
                }
            });

        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    }

    carregarNoticias();

});