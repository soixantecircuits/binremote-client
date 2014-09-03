var binremoteServer = new Asteroid("binremote.meteor.com");

binremoteServer.on('logout', function(){
    console.log('logged out');
});

// function connectionHandler(res, mail){
//     if(res === undefined)
//         return res;

//     binremoteServer.subscribe("remotes");
//     binremoteServer.subscribe("users");

//     var users = binremoteServer.getCollection('users');
//     var userQuery = users.reactiveQuery({ 'profile.email': mail }).result;
//     user = userQuery[0];

//     currentUser = user.profile;
//     currentUser.path = process.env.HOME;
//     currentUser.pcname = require('os').hostname();

//     // regarder à cause de "@" qui doit niquer la regex
//     usersCollection.upsert( user.profile, 'email', user.profile.email);

//     var remotes = binremoteServer.getCollection('remotes');
//     var remotesQuery = remotes.reactiveQuery({});
//     remotesQuery.on('change', function (){
//         var data = this.result;
//         data = data[0];
//         checkState(data);
//         binsCollection.update(data);
//     });
// }

function checkState(currentBins){
    var current = currentBins.bins
    var prevBins = binsCollection.items;

    for(var i = 0; i < prevBins.length; i++){
        if(prevBins[i].state != current[i].state){
            if(current[i].state == "started"){
                startBin(prevBins[i]);
            } else {
                stopBin(prevBins[i]);
            }
        }
    }
}