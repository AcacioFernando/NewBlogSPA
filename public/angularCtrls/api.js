// Declare app level module which depends on filters, and services
angular.module('myApp', ["ngRoute", "ngSanitize", "ngCkeditor","ngFileUpload"])
    .run(['$rootScope', function($rootScope) {
        var hadRouteChange = false;
        $rootScope.$on("$routeChangeStart", function() {
            hadRouteChange = true;
        });
        function hook() {
            if (window.BOOMR && BOOMR.version) {
                if (BOOMR.plugins && BOOMR.plugins.Angular) {
                    BOOMR.plugins.Angular.hook($rootScope, hadRouteChange);
                }
                return true;
            }
        }

        if (!hook()) {
            if (document.addEventListener) {
                document.addEventListener("onBoomerangLoaded", hook);
            } else if (document.attachEvent) {
                document.attachEvent("onpropertychange", function(e) {
                    e = e || window.event;
                    if (e && e.propertyName === "onBoomerangLoaded") {
                        hook();
                    }
                });
            }
        }
    }]);