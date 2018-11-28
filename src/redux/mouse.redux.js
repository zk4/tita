import store from "./store";
import { message } from "antd";
import { getLastContent } from "../util/configUtil";
import "./keyboard";
const robot = window.require("robotjs");

const NO_MOUSEMOVE_EVENT = "NO_MOUSEMOVE_EVENT";
const spawn = window.require("child_process").spawn;
const app = window.require("electron").remote.app;
const path = window.require("path");

export function mouse(state = null, action) {
  switch (action.type) {
    case NO_MOUSEMOVE_EVENT: {
      return action.payload;
    }
    default:
      return state;
  }
}

let mouseKeyboardData = {
  position: { x: 0, y: 0 },
  key: null,
  intervalSec: 10,
  maxCheckSec: 360,
  nowSec: 0
};

var basepath = app.getAppPath();
console.log("basepath", basepath);
console.log( "source " +
basepath +
"/python/venv/bin/activate && python -u " +
basepath +
"/python/keyboard.py");
// var py = spawn('python3.7', ['-u', '../python/keyboard.py']);
var py = spawn(
  "source " +
    basepath +
    "/python/venv/bin/activate && python -u " +
    basepath +
    "/python/keyboard.py",
  {
    shell: true
  }
);
py.stdout.on("data", function(key) {
  // message.info(basepath)
 
  store.dispatch({ type: NO_MOUSEMOVE_EVENT, payload: false });
});

setInterval(() => {
  const lastContent = getLastContent();
  

  if (
    lastContent &&
    (lastContent.name !== "www.youtube.com" || lastContent.name !== "mpv" || lastContent.name !=="Logic Pro X")
  ) {
    var mouse = robot.getMousePos();

    // console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
    if (
      mouse.x === mouseKeyboardData.position.x &&
      mouse.y === mouseKeyboardData.position.y
    ) {
      mouseKeyboardData.nowSec += mouseKeyboardData.intervalSec;

      if (mouseKeyboardData.nowSec > mouseKeyboardData.maxCheckSec) {
        store.dispatch({ type: NO_MOUSEMOVE_EVENT, payload: true });
        message.info("mouse is not moving, stop monioring.");
      }
    } else {
      mouseKeyboardData.position.x = mouse.x;
      mouseKeyboardData.position.y = mouse.y;
      mouseKeyboardData.nowSec = 0;
      store.dispatch({ type: NO_MOUSEMOVE_EVENT, payload: false });
    }
  } else {
    store.dispatch({ type: NO_MOUSEMOVE_EVENT, payload: false });
  }
}, mouseKeyboardData.intervalSec * 1000);
