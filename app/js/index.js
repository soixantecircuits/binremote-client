// var db = new IndexedDb({namespace: "binremote"});
// db.addCollection('bins');

var walkPath = process.env.HOME + '/sources/';

var bins;

function scan(){
	console.log(walkPath);
	bins = [];
	walk.sync(walkPath, function(path){
		if(path.indexOf('remote.json') > -1) {
			console.log('Remote found in: ' + path);
			var remote = fs.readFileSync(path,'utf8');
			var remote = JSON.parse(remote);
			bins.push(remote);
			// db.bins.upsert(remote);
		}
	});
	console.log('disk scanned');
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
