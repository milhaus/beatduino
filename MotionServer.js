#!/usr/bin/env node
var amqp = require('./beatduino_lib');


amqp.subscribe('motion', function(msg) {
  var x = msg.x, y = msg.y, z = msg.z;
  //var pot = msg.pot;
  console.log("GOT SOME POT! : " + x);
});

