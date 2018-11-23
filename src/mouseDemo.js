var robot = require("robotjs");

setInterval(() => {
  var mouse = robot.getMousePos();
  console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
}, 2000);
