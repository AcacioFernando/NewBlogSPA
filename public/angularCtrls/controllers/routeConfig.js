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
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });


    }
});

/*
 angular.module("myApp").run([
 '$rootScope',
 function($rootScope) {
 // see what's going on when the route tries to change
 $rootScope.$on('$routeUpdate', function(event, next, current) {
 // next is an object that is the route that we are starting to go to
 // current is an object that is the route where we are currently
 var currentPath = current.originalPath;
 var nextPath = next.originalPath;

 console.log('Starting to leave %s to go to %s', currentPath, nextPath);
 });
 }
 ]);*/
