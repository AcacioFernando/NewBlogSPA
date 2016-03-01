angular.module("myApp").controller("indexCtrl", function ($scope, $http) {

    $scope.noticias = [];
    $scope.usuario = "";


    var carregarNoticias = function () {
        console.log("Entrei aqui ");
        $http.get("/buscarnoticias").success(function (data) {
            $scope.noticias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };


    carregarNoticias();

});