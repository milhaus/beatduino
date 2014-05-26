#!/usr/bin/env node
// reference code for getting data from motion queue

var amqp = require('beatduino-helpers');

amqp.subscribe('motion', function(msg) {
  var x = msg.x, y = msg.y, z = msg.z, Gx = msg.Gx, Gy = msg.Gy, Gz = msg.Gz;
  console.log("Dance human! : " + Gz);
});

