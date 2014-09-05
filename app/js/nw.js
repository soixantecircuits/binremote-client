'use strict';

var isNode = typeof global !== "undefined" && {}.toString.call(global) == '[object global]';
var win;

if(isNode){
	process.on('uncaughtException', function(err) {
		console.log(err);
	});

	win = require('nw.gui').Window.get();
	// win.showDevTools();
}