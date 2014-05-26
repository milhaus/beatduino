#!/usr/bin/env node

var beatduino = require('beatduino-helpers');
var serialport = require("serialport");

var sp = serialport.SerialPort;

// you may need to change which tty you're listening to
var serialPort = new sp("/dev/tty.usbmodem1421", {
    parser: serialport.parsers.readline("\r\n")
});

var zeroG = 512;
var scale = 102.3;

function gimmeG(measurement) {
	return (measurement - zeroG) / scale;
}

serialPort.on("open", function () {
  serialPort.on('data', function(data) {
	  var tmp = data.split('|');
	  console.log(tmp);
	  var motionObj = {
		  "x": tmp[0],
		  "y": tmp[1],
		  "z": tmp[2],
		  "Gx": gimmeG(tmp[0]),
		  "Gy": gimmeG(tmp[1]),
		  "Gz": gimmeG(tmp[2])
	  }
	  
     beatduino.publish('motion', motionObj);
  });
});