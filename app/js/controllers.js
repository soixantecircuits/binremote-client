app.controller('homeCtrl', function(){
	var form = $('#connection-form');
	form.garlic();
	form.submit(function (event){
		event.preventDefault();
		var mail = user.usermail = $('#usermail').val();
		var pass = user.password = $('#userpass').val();

		if(mail.length > 0 && pass.length > 0){
			connectToMeteor(mail, pass);
		} else {
			alert('Il faut remplir les champs svp !');
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
			walkPath = $('#walk-dir').val();
			console.log(walkPath);
		}
	});
});