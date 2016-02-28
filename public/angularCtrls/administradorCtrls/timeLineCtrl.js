angular.module("myApp").controller("timeLineCtrl", function ($scope, $http) {

    $scope.noticias = [];
    $scope.usuario = "";


    var carregarNoticias = function () {
        console.log("Entrei aqui ");
        $http.get("/admin/buscarnoticias").success(function (data) {
            $scope.noticias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };


    carregarNoticias();

});