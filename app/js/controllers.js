app.controller('homeCtrl', function(){
	_.forEach(settings, function(set){
		if(set != ''){
			// console.log(set);
			// $('#'+set+'').val() = set;
		}
	});

	$('#connection').submit(function (event){
		event.preventDefault();
		var mail = settings.usermail;
		var pass = settings.password;
		// if(mail.length > 0 && pass.length > 0){
			connectToMeteor(mail,pass);
		// } else {
			// alert('Il faut remplir les champs svp !');
		// }
	});
});

app.controller('binsCtrl', function($scope){
	$scope.bins = bins;
});

app.controller('settingsCtrl', function($scope){
	$('#walk-dir-form').submit(function (event){
		event.preventDefault();
		if($('#walk-dir').val().length > 0) {
			walkPath = $('#walk-dir').val();
			console.log(walkPath);
		}
	});
});