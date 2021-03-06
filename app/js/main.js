'use strict';

app.controller('mainCtrl', function ($scope, $rootScope, $location, $timeout){
    $rootScope.currentUser = usersCollection.items[0] || {};
    $scope.showMessage = false;
    $scope.messages = '';
    $scope.isDraging = false;

    // $rootScope.onMessage = function() {
    $rootScope.$on('onMessage', function(event, mess){
        $scope.messages = mess;
        $scope.showMessage = true;
        $timeout(function(){
            $scope.showMessage = false;
            $scope.messages = '';
        }, 3000);
    });

    $scope.$on('$routeChangeSuccess', function(next, current) {
        $scope.showMessage = false;
    });

    binremoteServer._tryResumeLogin()
            .then(function (id){
                $rootScope.handleConnection('_id', id);
                console.log('connection done');
            })
            .fail(function (err){
                console.log('connection failed');
                window.location = '#/login';
            });

    $scope.logout = function(){
        binremoteServer.logout();
    }

    if(typeof(win) === "object"){
        $scope.nwClose = function(){
            win.close();
        }
        $scope.nwMin = function(){
            win.minimize();
        }
        $scope.nwMax = function(){
            if(screen.availHeight == window.outerHeight && screen.availWidth == window.outerWidth) {
                win.unmaximize();
            } else {
                win.maximize();
            }
        }
    }

    $rootScope.handleConnection = function(queryKey, queryValue) {
        binremoteServer.subscribe("remotes");
        binremoteServer.subscribe("users");

        var users = binremoteServer.getCollection('users');
        var userQuery;
        if( queryKey === '_id' ){
            userQuery = users.reactiveQuery({ '_id': queryValue }).result;
        } else if ( queryKey === 'profile.email' ){
            userQuery = users.reactiveQuery({ 'profile.email': queryValue }).result;
        }
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
            for (var i = data.bins.length - 1; i >= 0; i--) {
                binsCollection.upsert(data.bins[i]);
            };
        });
        window.location = '#/bins';
    }

});
