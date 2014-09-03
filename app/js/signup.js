'use strict';

app.controller('signCtrl', function ($scope, $location){
    $scope.signup = false;
    $scope.screenAction = $scope.signup ? 'Signup' : 'Sign in';
    $scope.credentials = {
        mail: '',
        pass: ''
    };

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
                connectionHandler(res, $scope.credentials.mail);
                window.location = '#/bins';
            });
        }
    }
});
