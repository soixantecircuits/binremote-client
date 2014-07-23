app.controller('homeCtrl', function(){
	var form = $('#connection-form');
	form.sisyphus();
	form.submit(function (event){
		event.preventDefault();
		var mail = settings.usermail = $('#usermail').val();
		var pass = settings.password = $('#userpass').val();
		var pcname = settings.pcname = $('#pcname').val();
		// var group = settings.group = $('#group').val();

		if(mail.length > 0 && pass.length > 0){
			connectToMeteor(mail, pass, pcname);
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
	form.sisyphus();

	form.submit(function (event){
		event.preventDefault();
		if($('#walk-dir').val().length > 0) {
			walkPath = $('#walk-dir').val();
			console.log(walkPath);
		}
	});
});