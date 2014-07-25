var	fs = require('fs'),
	walk = require('walkdir'),
	exec = require('child_process').exec,
	osUtils = require('os-utils'),
	storage = require('node-persist'),
	_ = require('lodash');

var app = angular.module('binremote',['ngRoute']);

storage.init();

var currentUser = {
	mail: '',
	pass: '',
	path: process.env.HOME,
	pcname: require('os').hostname(),
	company: '',
	group: ''
}