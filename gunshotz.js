#!/usr/bin/env node

var amqp = require('beatduino-helpers');
var exec = require('child_process').exec;

var shot = "wavs/TrpDrumz/FX/FX_2_Gunshot.wav";

function playrrr(){
	exec("play " + shot);
        //setTimeout( function() {
        //  exec("say 'DANCE MOTHER FUCKER!'");
        //}, 20);
}

amqp.subscribe('motion', function(msg) {
  var x = msg.x, y = msg.y, z = msg.z, Gx = msg.Gx, Gy = msg.Gy, Gz = msg.Gz;
  
  if (Gz > -.5) {
	  console.log("Dance human! : " + typeof Gz);
	  playrrr();
  }
  
  //console.log("Dance human! : " + Gz);
});
