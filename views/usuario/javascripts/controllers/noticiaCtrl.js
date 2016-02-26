angular.module("myApp").controller("noticiaCtrl", function ($scope, $http) {
    $scope.app = "Lista Telefonica";
    $scope.noticias = [];
    $scope.operadoras = [];

    var carregarNoticias = function () {
        $http.get("/noticias").success(function (data) {
            console.log(data);
            $scope.noticias = data;

        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    carregarNoticias();

});