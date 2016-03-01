/*
angular.module("myApp").directive("formatContent", function () {
    return {
        template: function(scope){
            console.log(scope);
            var content = scope.conteudo;
            return "<div>"+ content +"</div>";
        },

        replace: true,
        restrict: "AE",
        scope: {
            conteudo: "@"
        },
        transclude: true
    };
});*/

/*
angular.module('myApp').filter('formatContent', ['$sce',
    function($sce) {
        return function (input, type) {
            console.log(input);
            if (typeof input === "string") {
                return $sce.trustAs(type || 'html', input);
            }
            console.log("trustAs filter. Error. input isn't a string");
            return "";
        };
    }
]);*/
