#!/usr/bin/env node

var beatduino = require('./beatduino_lib.js');
var serialport = require("serialport");

var sp = serialport.SerialPort;

// you may need to change which tty you're listening to
var serialPort = new sp("/dev/tty.usbmodem1421", {
    parser: serialport.parsers.readline("\r\n")
});

serialPort.on("open", function () {
  serialPort.on('data', function(data) {
	  var tmp = data.split('|');
	  console.log(tmp);
	  var motionObj = {
		  "x": tmp[0],
		  "y": tmp[1],
		  "z": tmp[2]
	  }
	  
     beatduino.publish('motion', motionObj);
  });
});