'use strict';

var	fs = require('fs'),
	walk = require('walkdir'),
	exec = require('child_process').exec,
	osUtils = require('os-utils'),
	locallydb = require('locallydb'),
	_ = require('lodash');

var app = angular.module('binremote',['ngRoute']);

var db = new locallydb('./db');
var binsCollection = db.collection('bins');
var usersCollection = db.collection('user');