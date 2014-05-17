#!/usr/bin/env node
var amqp = require('./beatduino_lib');

amqp.subscribe('motion', function(msg) {
  var x = msg.x, y = msg.y, z = msg.z, Gx = msg.Gx, Gy = msg.Gy, Gz = msg.Gz;
  console.log("Dance human! : " + Gz);
});

