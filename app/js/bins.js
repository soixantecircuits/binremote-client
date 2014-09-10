app.controller('binsCtrl', function ($scope, $rootScope, $route, $location, $templateCache){
    $scope.bins = binsCollection.items;
    $scope.isScanning = false;

    console.log($rootScope.currentUser);

    $scope.showPath = false;
    $scope.path = $rootScope.currentUser.path;
    $scope.$watch('path',function(newPath){
        if(newPath.length > 0){
            console.log(newPath);
            $scope.path = newPath;
            $rootScope.currentUser.path = newPath;
        }
    })

    $scope.savePath = function(){
        $rootScope.currentUser.path = $scope.path;
        console.log($rootScope.currentUser.path);
    }

    var emitter;

    if($scope.bins === undefined){
        $scope.count = 0;
    } else if(typeof($scope.bins == 'object')){
        $scope.count = $scope.bins.length;
    } else {
        $scope.count = $scope.bins;
    }

    $scope.toggleScan = function(){
        if(!$scope.isScanning){
            $scope.scanDisk(function (){
                var currentPageTemplate = $route.current.templateUrl;
                $templateCache.remove(currentPageTemplate);
                $route.reload();
            });
        } else {
            emitter.end();
        }
    }

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
            }
        }).on('end', function(){
            console.log('Disk scanned.');
            $scope.updateCollection();
            $scope.isScanning = false;
            if(cb){
                cb();
            }
        });
    }

    $scope.updateCollection = function() {
        var data = $scope.createRemote();

        binremoteServer.call('addRemote', data); // on the cloud

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

