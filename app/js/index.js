var bins;
var emitter;
var isScanning = false;

function scanDisk(cb){
	console.log('Crawling from: ' + currentUser.path);
	isScanning = true;

	emitter = walk(currentUser.path);
	emitter.on('file', function (file, stat){
		if(file.indexOf('remote.json') > -1) {
			console.log('Remote found in: ' + file);

			var binFile = fs.readFileSync(file,'utf8');
			bin = JSON.parse(binFile);
			bin.state = "iddle";
			bin.path = file;

			binsCollection.upsert(bin, 'path', bin.path);
		}
	}).on('end', function(){
		console.log('Disk scanned.');
		updateCollection();
		isScanning = false;
		if(cb){
			cb();
		}
	});

	if($('#scan-btn').hasClass('scanning')){
		$('#scan-btn').removeClass('scanning');
	}
}

function createRemote(){
	var remote = {
		PCname: currentUser.pcname,
		group: currentUser.group,
		bins: binsCollection.items
	}
	return remote;
}

function startBin(el){
	exec(el.run);
	el.count ++;
	$('#view-container').find('#elem-'+el.id).removeClass('iddle').addClass('started');
}

function stopBin(el){
	exec(el.kill);
	$('#view-container').find('#elem-'+el.id).removeClass('started').addClass('iddle');
}
