var binremoteServer = new Asteroid("localhost:3000"),
	remotes,
	remotesQuery;

function connectToMeteor(mail, pass) {
	console.log('connect to meteor');
	binremoteServer.loginWithPassword(mail, pass).done(function(res) {
		binremoteServer.subscribe("remotes");
		binremoteServer.subscribe("users");

		var users = binremoteServer.getCollection('users');
		var user = users.reactiveQuery({}).result;
		user = user[0];

		user.usermail = mail;
		user.password = pass;
		user.group = user.profile.company.group;

		scanDisk();
		updateCollection();

		remotes = binremoteServer.getCollection('remotes');
		remotesQuery = remotes.reactiveQuery({});
		remotesQuery.on('change', function (){
			var data = this.result;
			data = data[0];
			storage.setItem('remotes', data);
			checkStateChange();
		});
	});
}

var activeBin;
function checkStateChange(){
	var data = storage.getItem('remotes');

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

function updateCollection() {
	var data = createRemote();

	binremoteServer.call('addRemote', data); // on the cloud

	storage.setItem('remotes', data);

	console.log('Collection updated');
}