app.controller('binsCtrl', function ($scope, $rootScope, $route, $location, $templateCache, $timeout){

    $scope.bins = binsCollection.items;
    $scope.isScanning = false;

    $scope.showPath = false;
    $scope.path = $rootScope.currentUser.path;
    $scope.$watch('path',function(newPath){
        if(newPath.length > 0){
            console.log(newPath);
            $scope.path = newPath;
            $rootScope.currentUser.path = newPath;
        }
    });

    $scope.savePath = function(){
        $rootScope.currentUser.path = $scope.path;
        console.log($rootScope.currentUser.path);
    }


    if($scope.bins === undefined){
        $scope.count = 0;
    } else if(typeof($scope.bins == 'object')){
        $scope.count = $scope.bins.length;
    } else {
        $scope.count = $scope.bins;
    }

    $scope.toggleScan = function(){
        if(!$scope.isScanning){
            $scope.scanDisk();
        } else {
            emitter.end();
        }
    }

    var emitter;
    $scope.scanDisk = function(cb){
        console.log('Crawling from: ' + $rootScope.currentUser.path);
        $scope.isScanning = true;

        emitter = walk($rootScope.currentUser.path);
        emitter.on('file', function (file, stat){
            if(file.indexOf('remote.json') > -1) {
                console.log('Remote found in: ' + file);

                var binFile = fs.readFileSync(file,'utf8');
                bin = JSON.parse(binFile);
                bin.state = "iddle";
                bin.path = file;

                binsCollection.upsert(bin, 'path', bin.path);

                var currentPageTemplate = $route.current.templateUrl;
                $templateCache.remove(currentPageTemplate);
                $route.reload();
            }
        }).on('end', function(){
            console.log('Disk scanned.');
            $scope.updateCollection();
            $scope.isScanning = false;
        });
    }

    $timeout(function(){
        $scope.scanDisk();
    }, 900000)

    $scope.updateCollection = function() {
        var data = $scope.createRemote();

        var method = binremoteServer.call('addRemote', data);
        method.result.then(function (res){
            console.log('Response: ' + res);
        }).catch(function onReject(err) {
            console.error('FAILED', err)
        });

        binsCollection.update(data);

        console.log('Collection updated');
    }

    $scope.createRemote = function(){
        var remote = {
            PCname: $rootScope.currentUser.pcname,
            group: $rootScope.currentUser.group,
            bins: binsCollection.items
        }
        return remote;
    }

    $scope.startBin = function(el, $element){
        exec(el.run);
        el.count ++;
        $element.find('#elem-'+el.id).removeClass('iddle').addClass('started');
    }

    $scope.stopBin = function(el, $element){
        exec(el.kill);
        $element.find('#elem-'+el.id).removeClass('started').addClass('iddle');
    }
});