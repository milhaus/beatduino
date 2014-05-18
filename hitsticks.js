#!/usr/bin/env node

var amqp = require('./beatduino_lib');
var exec = require('child_process').exec;

var kick = "wavs/KickDrum0006.aif";

function playrrr(){
	exec("play " + kick);
}

amqp.subscribe('motion', function(msg) {
  var x = msg.x, y = msg.y, z = msg.z, Gx = msg.Gx, Gy = msg.Gy, Gz = msg.Gz;
  
  if (Gz > 0) {
	  console.log("Dance human! : " + typeof Gz);
	  playrrr();
  }
  
  //console.log("Dance human! : " + Gz);
});