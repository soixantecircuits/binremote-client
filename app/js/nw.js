'use strict';

var isNode = typeof global !== "undefined" && {}.toString.call(global) == '[object global]';

if(isNode){
	process.on('uncaughtException', function(err) {
		console.log(err);
	});

	var win = require('nw.gui').Window.get();
	win.showDevTools();
}