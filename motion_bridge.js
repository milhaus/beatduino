#!/usr/bin/env node

var beatduino = require('./beatduino_lib.js');
var serialport = require("serialport");

var sp = serialport.SerialPort;
var serialPort = new sp("/dev/tty.usbmodem1421", {
    parser: serialport.parsers.readline("\n")
});

serialPort.on("open", function () {
  serialPort.on('data', function(data) {
	  console.log(JSON.stringify(data));
      beatduino.publish('motion', JSON.stringify(data));
  });
});