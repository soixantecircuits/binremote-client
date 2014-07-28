var binremoteServer = new Asteroid("localhost:3000");

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

binremoteServer.on('logout', function (){
	console.log("logged out");
})

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
		storage.setItem('remotes', data);
		checkStateChange();
	});

	if(currentUser.path != ''){
		window.location = "#/bins";
	} else {
		window.location = "#/path";
	}
}

var activeBin = [];
function checkStateChange(){
	var data = storage.getItem('remotes');

	if(data != undefined){
		_.forEach(data.bins, function(bin){
			console.log(activeBin);
			var binFind = _.findIndex(activeBin, function(el){
				console.log(el);
				return bin.id === el;
			});
			console.log(binFind);
			if(bin.state == 'started' && binFind < 0){
				startBin(bin);
				activeBin.push(bin.id);
				console.log('I just launched: ' + bin.name);
			} else if(bin.state == 'iddle' && binFind > 0){
				stopBin(bin);
				_.pluck(activeBin, bin.id);
				console.log('I just killed: ' + bin.name);
			}
		})
	}
}

function updateCollection() {
	var data = createRemote();

	binremoteServer.call('addRemote', data); // on the cloud

	storage.setItem('remotes', data);

	console.log('Collection updated');
}