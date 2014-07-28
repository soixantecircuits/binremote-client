app.controller('mainCtrl', function ($scope){
	binremoteServer._tryResumeLogin()
		.then(function (id){
			connectionCallback(id);
		})
		.fail(function (err){
			window.location = "#/signin";
			console.log(err);
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

app.controller('signinCtrl', function (){
	var form = $('#connection-form');
	var mail = $('#mail').val(currentUser.mail);
	var pass = $('#pass').val(currentUser.password);
	
	form.garlic();
	
	form.submit(function (event){
		event.preventDefault();
		mail = currentUser.mail = $('#mail').val();
		pass = currentUser.password = $('#pass').val();

		if(mail.length > 0 && pass.length > 0){
			connectToMeteor(mail, pass, function (res){
				// window.location = "#/bins";
			});
		} else if(!form.find('.error').length) {
			form.append('<p class="error" style="display:none;">You need to fill up the fields :)</p>');
			form.find('.error').fadeIn(300);
			setTimeout(function(){
				form.find('.error').fadeOut(1000, function(){
					this.remove();
				});
			}, 3000);
		}
	});
});

app.controller('signupCtrl', function (){
	var form = $('#signup-form');
	
	form.garlic();
	
	form.submit(function (event){
		event.preventDefault();
		var mail = currentUser.mail = $('#mail').val();
		var pass = currentUser.pass = $('#pass').val();
		var company = currentUser.company = $('#company').val();

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
	$scope.bins = storage.getItem('remotes');
	
	if(typeof($scope.bins) == 'undefined'){
		$scope.count = 0;
	} else if(typeof($scope.bins == 'object')){
		$scope.count = $scope.bins.bins.length;
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
			storage.setItem('user', currentUser);
		}
	})
});

app.controller('errCtrl', function (){
})