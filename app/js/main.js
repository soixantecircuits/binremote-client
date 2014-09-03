'use strict';

app.controller('mainCtrl', function ($scope, $rootScope, $location){
    $rootScope.currentUser = usersCollection.items[0] || {};
    $rootScope.messages = {
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
});
