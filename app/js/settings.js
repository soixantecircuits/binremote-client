var	fs = require('fs'),
	walk = require('walkdir'),
	exec = require('child_process').exec,
	osUtils = require('os-utils');
	_ = require('lodash');

var app = angular.module('binremote',['ngRoute']);

var settings = {
	usermail: '',
	password: '',
	pcname: require('os').hostname(),
	group: ''
}