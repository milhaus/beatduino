#!/usr/bin/env node

var amqp = require('beatduino-helpers');
var exec = require('child_process').exec;

var kick = "wavs/tom.wav";
var soSensitive = -.5;	// g force threshold for dance events

function playrrr(){
	exec("play " + kick);
}

amqp.subscribe('motion', function(msg) {
  var x = msg.x, y = msg.y, z = msg.z, Gx = msg.Gx, Gy = msg.Gy, Gz = msg.Gz;
  
  down = Gz;
  
  if (Gx > soSensitive || Gy > soSensitive || Gz > soSensitive) {
	  console.log("Dance human! : " + down);
	  playrrr();
  }
});