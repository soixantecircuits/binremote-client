var bins;
var emitter;

function scanDisk(){
	console.log('Crawling from: ' + user.path);
	bins = [];

	emitter = walk(user.path);
	emitter.on('file', function (file, stat){
		if(file.indexOf('remote.json') > -1) {
			console.log('Remote found in: ' + file);
			var bin = fs.readFileSync(file,'utf8');
			bin = JSON.parse(bin);
			bin.id = bins.length + 1;
			bin.lastupdate = Date.now();
			bin.state = 'iddle';
			bins.push(bin);
		}
	}).on('end', function(){
		console.log('Disk scanned.');
	});

	if($('#scan-btn').hasClass('scanning')){
		$('#scan-btn').removeClass('scanning');
	}
}

function createRemote(){
	var remote = {
		PCname: user.pcname,
		group: user.group,
		bins: bins
	}
	return remote;
}

function startBin(el){
	exec(el.run);
	$('#view-container').find('#elem-'+el.id).removeClass('iddle').addClass('started');
}

function stopBin(el){
	exec(el.kill);
	$('#view-container').find('#elem-'+el.id).removeClass('started').addClass('iddle');
}

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'homeCtrl'
	})
	.when('/settings', {
		templateUrl: 'partials/settings.html',
		controller: 'settingsCtrl'
	})
	.when('/bins', {
		templateUrl: 'partials/bins.html',
		controller: 'binsCtrl'
	})
	.otherwise({
		redirectTo: 'partials/home.html',
		controller: 'homeCtrl'
	})
	.html5Mode = true;
});