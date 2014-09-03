app.controller('mainCtrl', function ($scope){
    binremoteServer._tryResumeLogin()
        .then(function (id){
            connectionCallback(id);
            window.location = "#/bins";
        })
        .fail(function (err){

        })

    $scope.toggleScan = function(){
        if(!isScanning){
            scanDisk(function (){
                $scope.$broadcast('refresh');
            });
        } else {
            emitter.end();
        }
    }

    $scope.logout = function(){
        binremoteServer.logout();
    }

})

app.controller('signCtrl', function ($scope){
    $scope.signup = false;
    $scope.screenAction = signup ? 'singup' : 'sign in';

    // var form = $('#connection-form');
    // var mail = $('#mail').val(currentUser.email);
    // var pass = $('#pass').val(currentUser.password);

    // form.garlic();

    // form.submit(function (event){
    //     event.preventDefault();
    //     mail = $('#mail').val();
    //     pass = $('#pass').val();

    //     if(mail.length > 0 && pass.length > 0){
    //         connectToMeteor(mail, pass, function (res){
    //             // window.location = "#/bins";
    //         });
    //     } else if(!form.find('.error').length) {
    //         form.append('<p class="error" style="display:none;">You need to fill up the fields :)</p>');
    //         form.find('.error').fadeIn(300);
    //         setTimeout(function(){
    //             form.find('.error').fadeOut(1000, function(){
    //                 this.remove();
    //             });
    //         }, 3000);
    //     }
    // });
});

app.controller('signupCtrl', function (){
    var form = $('#signup-form');

    form.garlic();

    form.submit(function (event){
        event.preventDefault();
        var mail = $('#mail').val();
        var pass = $('#pass').val();
        var company = $('#company').val();

        var group = company.toLowerCase();
        group = group.trim();
        group = group.replace(' ', '');

        var userToSend = {
            email: mail,
            password: pass,
            profile: {
                email: mail,
                company: {
                    name: company,
                    group: group
                }
            }
        };

        if(mail.length > 0 && pass.length > 0){
            binremoteServer.call('signup', userToSend, group);
            window.location = "#/signin";
            var header = $('#main-header');
            if(!header.find('.notice').length) {
                header.append('<p class="notice" style="display:none;">You will receive a confirmation email shortly.</p>');
                header.find('.notice').fadeIn(300);
                setTimeout(function(){
                    header.find('.notice').fadeOut(1000, function(){
                        this.remove();
                    });
                }, 3000);
            }
        } else if(!form.find('.error').length) {
            form.append('<p class="error" style="display:none;">You need to fill up the fields :)</p>');
            form.find('.error').fadeIn(300);
            setTimeout(function(){
                form.find('.error').fadeOut(1000, function(){
                    this.remove();
                });
            }, 3000);
        }
    })
});

app.controller('binsCtrl', function ($scope, $route, $location, $templateCache){
    $scope.bins = binsCollection.items;

    if($scope.bins === undefined){
        $scope.count = 0;
    } else if(typeof($scope.bins == 'object')){
        $scope.count = $scope.bins.length;
    } else {
        $scope.count = $scope.bins;
    }
    $scope.path = currentUser.path;

    $scope.$on('refresh', function (){
        var currentPageTemplate = $route.current.templateUrl;
        $templateCache.remove(currentPageTemplate);
        $route.reload();
    });
});

app.controller('pathCtrl', function ($scope){
    var form = $('#walk-dir-form');
    form.garlic();

    $scope.path = currentUser.path;

    $scope.$watch('path',function(newPath){
        if(newPath.length > 0){
            $scope.path = newPath;
            currentUser.path = newPath;
            // userCollection.update(currentUser);
        }
    })
});

app.controller('errCtrl', function (){
})