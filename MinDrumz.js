#!/usr/bin/env node

var beatduino = require('./beatduino_lib.js');
var exec = require('child_process').exec;

var KICKZ = ["wavs/KickDrum0007.aif", "wavs/KickDrum0006.aif", "wavs/TrpDrumz/808/808_18.wav", "wavs/TrpDrumz/808/SubBass1.wav", "wavs/KickDrum0013.aif"];
var SNAREZ = ["wavs/TrpDrumz/Snares/Snare_9.wav", "wavs/TrpDrumz/Snares/Snare_26.wav", "wavs/TrpDrumz/Snares/Snare_38.wav" ];
var SAMPLEZ = "wavs/TrpDrumz/Sounds/GunCockback.wav";
var CLAP = "wavs/TrpDrumz/Claps/Clap14.wav";

function playrrr(wav, counter){

  exec("play " + wav + " bass +" + counter % 2 + " echo 0.8 0.88 " + counter % 60 + " 0.4");
}

function randyNum(num) {
  return Math.floor((Math.random()*num)+1);
}

beatduino.subscribe( 'bpm', function(msg) {
  var bpm = msg.bpm, microTick = msg.microTick, tickCounter = msg.tickCounter, beat = msg.beat;
  console.log("BPM: " + bpm + " MICROTICK: " + microTick + " TICK COUNTER: " + tickCounter + " and BEAT is: " + beat);

  if (/[145]/.test(beat) && /[134]/.test(microTick) ) {
  console.log("MICROTICK IS A " + typeof microTick);
    if (Math.round(Math.random()*1)) {
      playrrr(KICKZ[4],tickCounter);
    }
  }
  var randClick= randyNum(3);
  if (/[57]/.test(beat) && randClick == microTick ) {
    console.log("survived! " + randClick);
  }
  if (/[2468]/.test(beat) && /[1]/.test(microTick) ) {
    console.log("zzzzZMICROK IS A " + typeof microTick);
    playrrr(CLAP, tickCounter);
    randNum = randyNum(7);
    setTimeout( function() {
      return playrrr(SNAREZ[1], tickCounter);
    }, randNum);
  }
  if (/[24]/.test(beat) && /[1]/.test(microTick) ) {
    if (randyNum(23) > 22) {
      setTimeout( function() {
        return playrrr(SNAREZ[2],tickCounter);
      }, randNum);
    }
  }
});
