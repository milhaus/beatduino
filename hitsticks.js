#!/usr/bin/env node

var amqp = require('./beatduino_lib');
var exec = require('child_process').exec;

var kick = "wavs/KickDrum0006.aif";
var soSensitive = -.5;	// g force threshold for dance events

function playrrr(){
	exec("play " + kick);
}

amqp.subscribe('motion', function(msg) {
  var x = msg.x, y = msg.y, z = msg.z, Gx = msg.Gx, Gy = msg.Gy, Gz = msg.Gz;
  
  if (Gz > soSensitive) {
	  console.log("Dance human! : " + typeof Gz);
	  playrrr();
  }
});