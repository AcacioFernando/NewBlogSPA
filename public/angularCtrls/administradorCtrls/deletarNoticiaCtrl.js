angular.module("myApp").controller("deletarNoticiaCtrl", function ($scope, $http, $routeParams) {
    $scope.noticias = [];

    var carregarNoticias = function () {
        console.log("Entrei aqui deletar");
        $http.get("/buscarnoticiasdeletar").success(function (data) {
            console.log(data);
            $scope.noticias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.deletarNoticia = function(value){
        console.log("Entrei aqui noticias: "+ value);
        $http.get("/buscarnoticiasdeletar").success(function (data) {
            console.log(data);
            $scope.noticias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    }

    carregarNoticias();

});