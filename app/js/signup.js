'use strict';

app.controller('signCtrl', function ($scope, $rootScope, $location){
    $scope.signup = false;
    $scope.screenAction = $scope.signup ? 'Signup' : 'Sign in';
    $scope.credentials = {
        mail: $rootScope.currentUser.email || '',
        pass: ''
    };

    console.log($rootScope.currentUser.email);

    // console.log($scope.credentials.mail);

    $scope.changeSignMode = function() {
        $scope.signup = !$scope.signup;
        $scope.screenAction = $scope.signup ? 'Signup' : 'Sign in';
    }

    $scope.submit = function(){
        if($scope.signup){
            console.log('yep');
        } else {
            binremoteServer.loginWithPassword($scope.credentials.mail, $scope.credentials.pass)
            .fail(function (res){
                $scope.messages.log = res.reason;
            })
            .done(function(res) {
                if(res === undefined)
                    return res;

                binremoteServer.subscribe("remotes");
                binremoteServer.subscribe("users");

                var users = binremoteServer.getCollection('users');
                var userQuery = users.reactiveQuery({ 'profile.email': $scope.credentials.mail }).result;
                var user = userQuery[0];

                $rootScope.currentUser = user.profile;
                $rootScope.currentUser.path = process.env.HOME;
                $rootScope.currentUser.pcname = require('os').hostname();

                // regarder à cause de "@" qui doit niquer la regex
                usersCollection.upsert( $rootScope.currentUser, 'email', user.profile.email);

                var remotes = binremoteServer.getCollection('remotes');
                var remotesQuery = remotes.reactiveQuery({});
                remotesQuery.on('change', function (){
                    var data = this.result;
                    data = data[0];
                    checkState(data);
                    binsCollection.update(data);
                });
                window.location = '#/bins';
            });
        }
    }
});
