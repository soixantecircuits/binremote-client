var	fs = require('fs'),
	walk = require('walkdir'),
	exec = require('child_process').exec,
	_ = require('lodash');

var app = angular.module('binremote',['ngRoute']);

var settings = {
	usermail: '',
	password: '',
	pcname: '',
	group: ''
}