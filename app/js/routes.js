'use strict';

app.config(function ($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'partials/loading.html'
    })
    .when('/sign', {
        templateUrl: 'partials/sign.html',
        controller: 'signCtrl'
    })
    .when('/bins', {
        templateUrl: 'partials/bins.html',
        controller: 'binsCtrl'
    })
    .otherwise({
        redirectTo: 'partials/404.html',
        controller: 'errCtrl'
    })
});