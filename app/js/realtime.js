// var binremoteServer = new Asteroid("ws://lrjpgnfwut.localtunnel.me:80/websocket");
var binremoteServer = new Asteroid("localhost:3000"),
	remotes,
	remotesQuery;

function connectToMeteor(_mail, _pass) {
	console.log('connect to meteor');
	var mail = _mail;
	var pass = _pass;
	binremoteServer.loginWithPassword(mail, pass).done(function(res) {
		console.log(res);
		binremoteServer.subscribe("remotes");

		scanDisk();
		updateCollection();

		remotes = binremoteServer.getCollection('remotes');
		remotesQuery = remotes.reactiveQuery({});
		remotesQuery.on('change', function (){
			var data = this.result;
			data = data[0];
			checkStateChange(data);
		});
	});
}

var activeBin;
function checkStateChange(data){
	console.log('check state');
	// data = data[0];

	_.forEach(data.bins, function(bin){
		if(bin.state == 'started'){
			startBin(bin);
			activeBin = bin.id;
		} else if(bin.state == 'iddle' && bin.id == activeBin){
			stopBin(bin);
			activeBin = null;
		}
	})
}

function updateCollection() {
	var data = createRemote();

	binremoteServer.call('addRemote', data); // on the cloud

	console.log('Collection updated');
}