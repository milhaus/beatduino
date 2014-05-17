#!/usr/bin/env node
var amqp = require('./beatduino_lib');

var bpm = 90;
//var bpm = 105;
console.log("Setting bpm to " + bpm);

var MIN = 60000;
var tickLength =  (MIN / bpm ) / 4;
var tickCounter = 1;
var jobbie;

amqp.subscribe('serial', function(msg) {
  //var pot = msg.pot;
  //console.log("GOT SOME POT! : " + pot);
  //console.log("JOBBIE IS " + jobbie);
  var diff = Math.abs(msg.pot - bpm);
  //console.log("Diff is " + diff);
  if (diff > 3) {
    console.log("BPM CHANGED!");
    bpm = msg.pot;
    tickLength = (MIN / bpm) / 4;
  }
});

//function derp() {
//    jobbie = setInterval(function() {
//      beatTick = tickCounter % 32;
//      if (beatTick === 0) {beatTick = 32;}
//      beat = Math.floor((beatTick + 3) / 4);
//      microTick = tickCounter % 4;
//      if (microTick === 0) {microTick = 4;}
//      var msg = {"bpm": bpm, "microTick": microTick, "tickLength": tickLength, "beat": beat, "tickCounter": tickCounter};
//      console.log("Sending msg -- " + JSON.stringify(msg));
//      amqp.publish('bpm', msg);
//      tickCounter++;
//    },tickLength);
//}

function sendBPM( callback ) {
  var internalCallback = function() {
    return function()
    {
      beatTick = tickCounter % 32;
      if (beatTick === 0) {beatTick = 32;}
      beat = Math.floor((beatTick + 3) / 4);
      microTick = tickCounter % 4;
      if (microTick === 0) {microTick = 4;}
      var msg = {"bpm": bpm, "microTick": microTick, "tickLength": tickLength, "beat": beat, "tickCounter": tickCounter};
      console.log("Sending msg -- " + JSON.stringify(msg));
      amqp.publish('bpm', msg);
      tickCounter++;
      setTimeout( internalCallback, tickLength );
      callback();
    }
  }();
  setTimeout( internalCallback, tickLength );
};

sendBPM( function(){ console.log( 'hi' );} );
