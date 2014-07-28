// var binremoteServer = new Asteroid("localhost:3000");
var binremoteServer = new Asteroid("binremote.meteor.com");

function connectToMeteor(mail, pass, cb) {
	console.log('connect to meteor');
	binremoteServer.loginWithPassword(mail, pass)
	.fail(function (res){
		var header = $('#main-header');
		if(!header.find('.notice').length) {
			header.append('<p class="notice" style="display:none;">' + res.reason + '.</p>');
			header.find('.notice').fadeIn(300);
			setTimeout(function(){
				header.find('.notice').fadeOut(1000, function(){
					this.remove();
				});
			}, 3000);
		}
	})
	.done(function(res) {
		connectionCallback(res);
	})
	cb();
}

binremoteServer.on('logout', function(){
	console.log('logged out');
});

function connectionCallback(res){
	console.log(res);

	binremoteServer.subscribe("remotes");
	binremoteServer.subscribe("users");

	var users = binremoteServer.getCollection('users');
	var userQuery = users.reactiveQuery({}).result;
	user = userQuery[0];

	currentUser.mail = user.profile.email;
	currentUser.company = user.profile.company.name;
	currentUser.group = user.profile.company.group;
	storage.setItem('user', user);

	var remotes = binremoteServer.getCollection('remotes');
	var remotesQuery = remotes.reactiveQuery({});
	remotesQuery.on('change', function (){
		var data = this.result;
		data = data[0];
		checkState(data);
		storage.setItem('remotes', data);
	});

	if(currentUser.path != ''){
		window.location = "#/bins";
	} else {
		window.location = "#/path";
	}
}

function checkState(currentBins){
	var current = currentBins.bins
	var prevBins = storage.getItem('remotes');
	if(prevBins != undefined){
		var prev = prevBins.bins;
		for(var i = 0; i < prev.length; i++){
			if(prev[i].state != current[i].state){
				// console.log(prev[i], current[i]);
				if(current[i].state == "started"){
					startBin(prev[i]);
				} else {
					stopBin(prev[i]);
				}
			}
		}
	}
}

function updateCollection() {
	var data = createRemote();

	binremoteServer.call('addRemote', data); // on the cloud

	storage.setItem('remotes', data);

	console.log('Collection updated');
}