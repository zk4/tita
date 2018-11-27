import store from "./store";
import { message } from "antd";
import { getLastContent } from "../util/configUtil";
const robot = window.require("robotjs");

const NO_MOUSEMOVE_EVENT = "NO_MOUSEMOVE_EVENT";
const spawn=require("child_process").spawn;
 

export function mouse(state = null, action) {
  switch (action.type) {
    case NO_MOUSEMOVE_EVENT: {
      return action.payload;
    }
    default:
      return state;
  }
}

let mouseData = {
  position: { x: 0, y: 0 },
  intervalSec: 5,
  maxCheckSec: 30,
  nowSec: 0
};

setInterval(() => {
  const lastContent = getLastContent();
  if (lastContent && (lastContent.name === "www.youtube.com"    || lastContent.name === "mpv")) {
    var mouse = robot.getMousePos();
    
    // console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
    if (mouse.x === mouseData.position.x && mouse.y === mouseData.position.y) {
      mouseData.nowSec += mouseData.intervalSec;

      if (mouseData.nowSec > mouseData.maxCheckSec) {
        store.dispatch({ type: NO_MOUSEMOVE_EVENT, payload: true });
        message.info("mouse is not moving, stop monioring.");
      }
    } else {
      mouseData.position.x = mouse.x;
      mouseData.position.y = mouse.y;
      mouseData.nowSec = 0;
      store.dispatch({ type: NO_MOUSEMOVE_EVENT, payload: false });
    }
  } else {
    store.dispatch({ type: NO_MOUSEMOVE_EVENT, payload: false });
  }
}, mouseData.intervalSec * 1000);
