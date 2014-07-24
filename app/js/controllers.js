app.controller('homeCtrl', function(){
	var form = $('#connection-form');
	form.garlic();
	form.submit(function (event){
		event.preventDefault();
		var mail = user.usermail = $('#usermail').val();
		var pass = user.password = $('#userpass').val();

		if(mail.length > 0 && pass.length > 0){
			connectToMeteor(mail, pass);
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

app.controller('binsCtrl', function($scope){
	$scope.bins = bins;
});

app.controller('settingsCtrl', function($scope){
	var form = $('#walk-dir-form');
	form.garlic();

	form.submit(function (event){
		event.preventDefault();
		if($('#walk-dir').val().length > 0) {
			user.path = $('#walk-dir').val();
			console.log(user.path);
		}
	});
});