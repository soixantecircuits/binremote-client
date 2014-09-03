'use strict';

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'partials/sign.html',
        controller: 'signCtrl'
    })
    .when('/sign', {
        templateUrl: 'partials/sign.html',
        controller: 'signCtrl'
    })
    .when('/bins', {
        templateUrl: 'partials/bins.html',
        controller: 'binsCtrl'
    })
    .when('/path', {
        templateUrl: 'partials/path.html',
        controller: 'pathCtrl'
    })
    .otherwise({
        redirectTo: 'partials/404.html',
        controller: 'errCtrl'
    })
    .html5Mode = true;
});