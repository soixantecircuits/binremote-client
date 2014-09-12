'use strict';

app.config(function ($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'partials/loading.html'
    })
    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
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