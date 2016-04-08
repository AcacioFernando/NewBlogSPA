angular.module("myApp").config(function ($routeProvider, $locationProvider) {
    if (window.history && window.history.pushState) {
        $routeProvider

        // route for the home page
            .when('/', {
                templateUrl: '/views/noticias',
                controller: 'noticiasCtrl'
            })
            // route for the about page
            .when('/noticia/:value', {

                templateUrl: '/views/noticia',
                controller: 'noticiaCtrl'
            })

            // route for the about page
            .when('/categoria/:value', {
                templateUrl: '/views/categoria',
                controller: 'categoriaCtrl'
            })

            .when('/search/:value', {
                templateUrl: '/views/categoria',
                controller: 'searchCtrl'
            })
            .when('/admin', {
                templateUrl: '/views/admin',
                controller: 'indexCtrl'
            })
            .when('/admin/deletarnoticia', {
                templateUrl: '/views/deletarnoticia',
                controller: 'deletarNoticiaCtrl'
            })
            .when('/admin/cadastrarnoticia', {
                templateUrl: '/views/cadastarnoticia',
                controller: 'cadastrarNoticiaCtrl'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });


    }
});

