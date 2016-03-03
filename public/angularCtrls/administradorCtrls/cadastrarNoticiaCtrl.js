angular.module("myApp").controller("cadastrarNoticiaCtrl", function ($scope, $http, $routeParams) {
    $scope.app = "Lista Telefonica";
    $scope.categorias =[];
    $scope.editorOptions = {
        language: 'pt'
        // uiColor: '#000000'
    };
    var carregarCategorias= function () {
        console.log("Entrei cadastar noticias")
        $http.get("/buscarcategorias").success(function (data) {
            console.log(data);
            $scope.categorias = data;
        }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.save = function() {
        $http.post('/examples/test.php', {
            content: $scope.test
        }).success(function() {
            alert('Saved');
        });
    }
    carregarCategorias();
});