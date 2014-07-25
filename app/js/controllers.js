app.controller('mainCtrl', function(){
	binremoteServer._tryResumeLogin()
		.then(function (id){
			console.log(id);
			binremoteServer.subscribe("remotes");
			binremoteServer.subscribe("users");

			var users = binremoteServer.getCollection('users');
			var user = users.reactiveQuery({}).result;
			user = user[0];

			currentUser.mail = user.profile.email;
			currentUser.company = user.profile.company.name;
			currentUser.group = user.profile.company.group;
			storage.setItem('user', currentUser);

			remotes = binremoteServer.getCollection('remotes');
			remotesQuery = remotes.reactiveQuery({});
			remotesQuery.on('change', function (){
				var data = this.result;
				data = data[0];
				storage.setItem('remotes', data);
				checkStateChange();
			});
		})
		.fail(function (err){
			window.location = "#/signin";
			console.log(err);
		})
})

app.controller('signinCtrl', function(){
	var form = $('#connection-form');
	var mail = $('#mail').val(currentUser.mail);
	var pass = $('#pass').val(currentUser.password);
	
	form.garlic();
	
	form.submit(function (event){
		event.preventDefault();
		mail = currentUser.mail = $('#mail').val();
		pass = currentUser.password = $('#pass').val();

		if(mail.length > 0 && pass.length > 0){
			connectToMeteor(mail, pass, function(){
				window.location = "#/bins";
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

app.controller('signupCtrl', function(){
	var form = $('#signup-form');
	
	form.garlic();
	
	form.submit(function (event){
		event.preventDefault();
		var mail = currentUser.mail = $('#mail').val();
		var pass = currentUser.pass = $('#pass').val();
		var company = currentUser.company = $('#company').val();

		if(mail.length > 0 && pass.length > 0){
			binremoteServer.createUser(mail, pass);
			window.location = "#/";
			// rajouter un message qui dit qu'il recevra un mail de confirmation
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

app.controller('binsCtrl', function($scope){
	$scope.bins = storage.getItem('remotes');
});

app.controller('settingsCtrl', function($scope){
	var form = $('#walk-dir-form');
	form.garlic();

	form.submit(function (event){
		event.preventDefault();
		if($('#walk-dir').val().length > 0) {
			currentUser.path = $('#walk-dir').val();
			console.log(currentUser.path);
		}
	});
});

app.controller('errCtrl', function(){
})