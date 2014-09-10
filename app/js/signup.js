'use strict';

app.controller('signCtrl', function ($scope, $rootScope, $location){
    $scope.signup = false;
    $scope.confirmation = false;
    $scope.screenAction = $scope.signup ? 'Signup' : 'Sign in';
    $scope.credentials = {
        mail: $rootScope.currentUser.email || '',
        pass: '',
        company: ''
    };


    $scope.changeSignMode = function() {
        $scope.signup = !$scope.signup;
        $scope.screenAction = $scope.signup ? 'Signup' : 'Sign in';
    }

    $scope.submit = function(){
        if($scope.signup){
            var userToSend = {
                email: $scope.credentials.mail,
                password: $scope.credentials.pass,
                profile: {
                    email: $scope.credentials.mail,
                    company: {
                        name: $scope.credentials.company,
                        group: $scope.credentials.company.toLowerCase()
                    }
                }
            };
            binremoteServer.call('signup', userToSend, userToSend.profile.company.group);
            $scope.confirmation = true;
        } else {
            binremoteServer.loginWithPassword($scope.credentials.mail, $scope.credentials.pass)
            .fail(function (res){
                $scope.messages.log = res.reason;
            })
            .done(function(res) {
                if(res === undefined)
                    return res;

                $rootScope.handleConnection('profile.email', $scope.credentials.mail);
            });
        }
    }
});
