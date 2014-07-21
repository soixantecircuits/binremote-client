app.controller('homeCtrl', function(){

});
app.controller('binsCtrl', function($scope){
	// scan();
	$scope.bins = bins;
});
app.controller('settingsCtrl', function($scope){
	$('#walk-dir-form').submit(function (e){
		if($('#walk-dir').val().length > 0) {
			walkPath = $('#walk-dir').val();
			console.log(walkPath);
		}
		e.preventDefault();
	});
});