angular.module("myApp").controller("noticiasCtrl", function ($scope, $http, $location, $window) {
    $scope.app = "Lista Telefonica";
    $scope.noticias = [];
    $scope.noticiasMaisLidas = [];
    $scope.noticiasBanner = [];
    $scope.categorias = [];
    $scope.comentarios = [];
    $scope.criterioDeBusca = "";
    $scope.usuario = "";

    var carregarUsuario = function () {
        $http.get("/buscarusuario").success(function (data) {
            console.log("Entrei aqui 1: " + data);
            $scope.usuario = data;
            console.log($scope.usuario);
        }).error(function (data, status) {
            console.log(usuario);
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    var carregarNoticias = function () {
        $http.get("/buscarnoticias").success(function (data) {
            $scope.noticias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    var carregarNoticiasMaisLidas = function () {
        $http.get("/noticiasmaislidas").success(function (data) {
            $scope.noticiasMaisLidas = data;
            $scope.noticiasBanner = data.slice(-3);
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    var carregarCategorias = function () {
        $http.get("/buscarcategorias").success(function (data) {
            $scope.categorias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.startEvent = function (criterioDeBusca) {
        startTime();
        $window.location.href ='/noticia/' + criterioDeBusca;
    };

    $scope.buscarNoticia = function (idNoticia) {
        $http.get("/buscarnoticia/" + idNoticia).success(function (data) {
            $scope.noticias = data;
            $scope.comentarios = data.comments;
            $scope.noticiasBanner = [];
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });

    };

    $scope.buscarCategoria = function (categoria) {
        $http.get("/buscarcategoria/" + categoria).success(function (data) {
            $scope.noticias = data;
            $scope.noticiasBanner = data.slice(-3);
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.gosteiNoticia = function (idNoticia) {
        startTime();
        var noticias = $scope.noticias;
        $http.get("/gosteinoticia/" + idNoticia).success(function () {
            $scope.noticias = noticias.filter(function (noticia) {
                if (noticia._id == idNoticia) {
                    noticia.gostei = noticia.gostei + 1;
                    endTime();
                }
                return noticia;
            });
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.naoGosteiNoticia = function (idNoticia) {

       // BOOMR.plugins.RT.startTimer("t_done");	// Start measuring download time

        var noticias = $scope.noticias;

        $http.get("/naogosteinoticia/" + idNoticia).success(function () {

            $scope.noticias = noticias.filter(function (noticia) {
                if (noticia._id == idNoticia) {
                    noticia.nao_gostei = noticia.nao_gostei + 1;
                }
               // BOOMR.plugins.RT.done();	// Tell boomerang to measure time and fire a beacon

                return noticia;
            });

        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    carregarCategorias();
    carregarNoticiasMaisLidas();
    carregarNoticias();
    carregarUsuario();

});