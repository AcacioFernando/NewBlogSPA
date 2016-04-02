// Declare app level module which depends on filters, and services
angular.module('myApp', ["ngRoute", "ngSanitize", "ngCkeditor","ngFileUpload"])
    .run(['$rootScope', function($rootScope) {
        var hadRouteChange = false;
        $rootScope.$on("$routeChangeStart", function() {
            hadRouteChange = true;
        });
        function hookAngularBoomerang() {
            if (window.BOOMR && BOOMR.version) {
                if (BOOMR.plugins && BOOMR.plugins.Angular) {
                    BOOMR.plugins.Angular.hook($rootScope, hadRouteChange);
                }
                return true;
            }
        }
        if (!hookAngularBoomerang()) {
            if (document.addEventListener) {
                document.addEventListener("onBoomerangLoaded", hookAngularBoomerang);
            }
            else if (document.attachEvent) {
                document.attachEvent("onpropertychange", function(e) {
                    e = e || window.event;
                    if (e && e.propertyName === "onBoomerangLoaded") {
                        hookAngularBoomerang();
                    }
                });
            }
        }
    }]);
