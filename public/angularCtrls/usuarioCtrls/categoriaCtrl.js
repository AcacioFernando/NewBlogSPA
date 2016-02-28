angular.module("myApp").controller("categoriaCtrl", function ($scope, $http, $routeParams) {
    $scope.app = "Lista Telefonica";
    $scope.noticias = [];

    var carregarNoticiaCategorias = function () {
        console.log("Entrei aqui");
        $http.get("/buscarcategoria/" + $routeParams.value).success(function (data) {
            console.log(data);
            $scope.noticias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.gosteiNoticia = function (idNoticia) {
        console.log("id: " + idNoticia);
        var noticias = $scope.noticias;

        $http.get("/gosteinoticia/" + idNoticia).success(function () {

            $scope.noticias = noticias.filter(function (noticia) {
                if (noticia._id == idNoticia) {
                    noticia.gostei = noticia.gostei + 1;
                }
                return noticia;
            });

        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.naoGosteiNoticia = function (idNoticia) {
        console.log("id: " + idNoticia);
        var noticias = $scope.noticias;

        $http.get("/naogosteinoticia/" + idNoticia).success(function () {

            $scope.noticias = noticias.filter(function (noticia) {
                if (noticia._id == idNoticia) {
                    noticia.nao_gostei = noticia.nao_gostei + 1;
                }
                return noticia;
            });

        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    carregarNoticiaCategorias();

});