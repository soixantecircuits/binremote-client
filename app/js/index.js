var walkPath = process.env.HOME + '/sources/';

var bins;

function scanDisk(){
	console.log('Crawling from: ' + walkPath);
	bins = [];
	walk.sync(walkPath, function(path){
		if(path.indexOf('remote.json') > -1) {
			console.log('Remote found in: ' + path);
			var bin = fs.readFileSync(path,'utf8');
			bin = JSON.parse(bin);
			bin.id = bins.length + 1;
			bin.lastupdate = Date.now();
			bin.state = 'iddle';
			bins.push(bin);
		}
	});
	console.log('Disk scanned.');
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
}

function stopBin(el){
	exec(el.kill);
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