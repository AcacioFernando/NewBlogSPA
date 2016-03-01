angular.module("myApp").controller("cadastrarNoticiaCtrl", function ($scope, $http, $routeParams) {
    $scope.app = "Lista Telefonica";
    $scope.categorias =[];

    var carregarCategorias= function () {
        console.log("Entrei cadastar noticias")
        $http.get("/buscarcategorias").success(function (data) {
            console.log(data);
            $scope.categorias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    carregarCategorias();
});