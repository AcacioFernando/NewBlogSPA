angular.module("myApp").controller("noticiaCtrl", function ($scope, $http) {
    $scope.app = "Lista Telefonica";
    $scope.noticias = [];
    $scope.noticiasMaisLidas = [];
    $scope.noticiasBanner = [];
    $scope.categorias =[];
    $scope.comentarios =[];
    $scope.criterioDeBusca ="";

    var carregarNoticias = function () {
        $http.get("/noticias").success(function (data) {
            console.log(data);
            $scope.noticias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    var carregarNoticiasMaisLidas = function () {
        $http.get("/noticiasmaislidas").success(function (data) {
            console.log(data);
            $scope.noticiasMaisLidas = data;
            console.log("Banner");
            $scope.noticiasBanner = data.slice(-3);
            console.log($scope.noticiasBanner);
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    var carregarCategorias= function () {
        $http.get("/buscarcategorias").success(function (data) {
            console.log(data);
            $scope.categorias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.buscarNoticias = function (criterioDeBusca) {
        $http.get("/buscarnoticias/"+criterioDeBusca).success(function (data) {
            console.log(data);
            $scope.noticias = data;
            $scope.noticiasBanner = data.slice(-3);
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });

    };

    $scope.buscarNoticia = function (idNoticia) {

        $http.get("/buscarnoticia/"+idNoticia).success(function (data) {
            console.log(data);
            $scope.noticias = data;
            $scope.categorias = data.comments;
            $scope.noticiasBanner = [];
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });

    };

    $scope.buscarCategoria = function (categoria) {
        $http.get("/buscarcategoria/"+categoria).success(function (data) {
            console.log(data);
            $scope.noticias = data;
            $scope.noticiasBanner = data.slice(-3);
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };
    
    $scope.gosteiNoticia= function (idNoticia) {
        console.log("id: "+ idNoticia);
        var noticias = $scope.noticias;

        $http.get("/gosteinoticia/"+idNoticia).success(function () {

            $scope.noticias = noticias.filter(function (noticia) {
                if (noticia._id == idNoticia ) {
                    noticia.gostei = noticia.gostei + 1;
                }
                return noticia;
            });

        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.naoGosteiNoticia= function (idNoticia) {
        console.log("id: "+ idNoticia);
        var noticias = $scope.noticias;

        $http.get("/naogosteinoticia/"+idNoticia).success(function () {

            $scope.noticias = noticias.filter(function (noticia) {
                if (noticia._id == idNoticia ) {
                    noticia.nao_gostei = noticia.nao_gostei + 1;
                }
                return noticia;
            });

        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    carregarCategorias();
    carregarNoticiasMaisLidas();
    carregarNoticias();

});