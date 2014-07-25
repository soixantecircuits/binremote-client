var binremoteServer = new Asteroid("localhost:3000");

function connectToMeteor(mail, pass, cb) {
	console.log('connect to meteor');
	binremoteServer.loginWithPassword(mail, pass).done(function(res) {
		binremoteServer.subscribe("remotes");
		binremoteServer.subscribe("users");

		var users = binremoteServer.getCollection('users');
		var userQuery = users.reactiveQuery({}).result;
		user = userQuery[0];

		currentUser.mail = user.profile.email;
		currentUser.company = user.profile.company.name;
		currentUser.group = user.profile.company.group;
		storage.setItem('user', currentUser);

		var remotes = binremoteServer.getCollection('remotes');
		var remotesQuery = remotes.reactiveQuery({});
		remotesQuery.on('change', function (){
			var data = this.result;
			data = data[0];
			storage.setItem('remotes', data);
			checkStateChange();
		});
	});
	cb();
}

var activeBin;
function checkStateChange(){
	var data = storage.getItem('remotes');

	if(data != undefined){
		_.forEach(data.bins, function(bin){
			if(bin.state == 'started'){
				startBin(bin);
				activeBin = bin.id;
				console.log('I just launched: ' + bin.name);
			} else if(bin.state == 'iddle' && bin.id == activeBin){
				stopBin(bin);
				activeBin = null;
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