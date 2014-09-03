'use strict';

app.controller('mainCtrl', function ($scope, $location){
    $scope.currentUser = {
        path: '/home/debian/'
    };
    $scope.messages = {
        log: ''
    };

    binremoteServer._tryResumeLogin()
        .then(function (id){
            connectionHandler(id);
            console.log('connection done');
        })
        .fail(function (err){
            console.log('connection failed');
        })

    $scope.logout = function(){
        binremoteServer.logout();
    }
})